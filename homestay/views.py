from functools import reduce

from django.contrib.auth.mixins import LoginRequiredMixin
from django.forms import inlineformset_factory
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.views import generic

from .models import *
from .forms import HomestayForm, BookingForm, BookingGuestInfoForm
from django.contrib.auth.decorators import login_required
from util.utils import Searcher


# Create your views here.
# View list các homestay
class BrowseView(generic.ListView):
    template_name = 'homestay/browse.html'
    context_object_name = 'homestay_list'

    def get_queryset(self):
        return Homestay.objects.all()[:10]


# View xem các Homestay User đã đăng
class MyView(LoginRequiredMixin, generic.ListView):
    login_url = '/account/login'

    template_name = 'homestay/browse.html'
    context_object_name = 'homestay_list'

    def get_queryset(self):
        return Homestay.objects.filter(owner=self.request.user).all()

# View Thông tin chi tiết
class HomestayView(generic.DetailView):
    model = Homestay

    def get_template_names(self):
        return 'homestay/detail2.html'  # if 'test/' not in self.request.path else 'homestay/detail2.html'


# View upload
@login_required(login_url='/account/login')
def upload_view(request):
    # Tạo 1 image form set để upload nhiều image
    ImageFormSet = inlineformset_factory(Homestay, ReviewImage, fields=('image',))
    if request.method == 'POST':
        # Feed cho form điền thông tin homestay và up images
        form = HomestayForm(request.POST)
        image_formset = ImageFormSet(request.POST, request.FILES, queryset=ReviewImage.objects.none())

        # Kiểm tra form hợp lệ
        if form.is_valid():
            homestay = form.save(commit=False)
            homestay.owner = request.user
            homestay.save()
            if form.is_valid():
                # Chỉ lấy những image form đúng chuẩn
                for form in image_formset.cleaned_data:
                    if form:
                        image = form['image']
                        photo = ReviewImage(homestay=homestay, image=image)
                        photo.save()
            try:
                homestay.welcomes = reduce(lambda a, b: int(a) | int(b), form.cleaned_data['welcomes'])
                for f in form.cleaned_data['homestay_facilities'] + form.cleaned_data['area_facilities']:
                    homestay.facilities.add(int(f))
            except ValueError:
                pass
            homestay.save()

            # Redirect đến trang upload thành công
            return redirect('hm:upload_success')
    else:
        form = HomestayForm()
        image_formset = ImageFormSet(queryset=ReviewImage.objects.none())
    return render(request, 'homestay/upload_homestay.html', {'form': form, 'image_formset': image_formset})

# View upload thành công.
# Mới chỉ làm để test
def upload_success_view(request):
    return render(request, 'homestay/upload_success.html', {})


def detail2(request):
    return render(request, 'homestay/detail2.html', {})


def about_view(request):
    return render(request, 'homestay/about_us.html', {})


def search(request):
    lng = float(request.GET.get('lng'))
    lat = float(request.GET.get('lat'))
    results = Searcher.knn([lat, lng], 3)
    homestay_list = [adr.homestay for adr in results]
    return render(request, 'homestay/browse.html', {'homestay_list': homestay_list})


# View cho việc đặt phông
# Mới chỉ làm chức năng kiểm tra trùng lặp ngày đặt với homestay
# Chưa làm với user.
# pk là primary key của homestay được đặt
def booking(request, hid):
    if request.method == "POST":
        guest_form = BookingGuestInfoForm(request.POST)
        booking_form = BookingForm(request.POST)
        # Ngày trùng lặp được kiểm tra trong clean của booking_form
        if guest_form.is_valid() and booking_form.is_valid():
            # Sau khi kiểm tra trùng lặp
            reservation = booking_form.save(commit=False)
            guest = guest_form.save(commit=False)
            if request.user.is_authenticated:
                guest.user = request.user
            guest.save()
            reservation.guest = guest
            reservation.homestay = Homestay.objects.get(pk=hid)
            reservation.state = Contract.State.NEW
            reservation.save()
            # Gửi phản hồi đơn giản
            return HttpResponse('success')
    else:
        # Form điền thông tin khách đặt
        # Lưu ý có thể khác thông tin của user đang đăng nhập
        guest_form = BookingGuestInfoForm()
        # Form điền thông tin đặt phòng
        # Mới chỉ có ngày check in và check out
        booking_form = BookingForm(initial={'hid': hid})
    return render(request, 'booking.html', {'form': booking_form, 'guest_form': guest_form, 'hid': hid})

def test_search(request):
    return render(request, 'homestay/search.html', {})
