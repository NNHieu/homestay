from functools import reduce

from django.contrib.auth.mixins import LoginRequiredMixin
from django.forms import modelformset_factory, inlineformset_factory
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.urls import reverse
from django.views import generic

from .models import *
from .forms import HomestayForm, ReviewImageForm
from django.contrib.auth.decorators import login_required


# Create your views here.
class BrowseView(generic.ListView):
    template_name = 'HomestayManagement/browse2.html'
    context_object_name = 'homestay_list'

    def get_queryset(self):
        return Homestay.objects.all()[:10]

    # def get_context_data(self, *, object_list=None, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context['user'] = self.request.user
    #     return context


class MyView(LoginRequiredMixin, generic.ListView):
    login_url = '/account/login'

    template_name = 'HomestayManagement/browse2.html'
    context_object_name = 'homestay_list'

    def get_queryset(self):
        return Homestay.objects.filter(owner=self.request.user).all()

    # def get_context_data(self, *, object_list=None, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context['user'] = self.request.user
    #     return context


class HomestayView(generic.DetailView):
    model = Homestay


@login_required(login_url='/account/login')
def upload_view(request):
    # Tạo 1 image form set để upload nhiều image
    ImageFormSet = inlineformset_factory(Homestay, ReviewImage, fields=('image',))
    if request.method == 'POST':
        # Feed cho form điền thông tin homestay và up images
        form = HomestayForm(request.POST)
        image_formset = ImageFormSet(request.POST, request.FILES, queryset=ReviewImage.objects.none())

        #Kiểm tra form hợp lệ
        if form.is_valid():
            homestay = form.save(commit=False)
            homestay.owner = request.user
            homestay.save()
            if form.is_valid():
                #Chỉ lấy những image form đúng chuẩn
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
    return render(request, 'HomestayManagement/upload_homestay.html', {'form': form, 'image_formset': image_formset})


def upload_success_view(request):
    return render(request, 'HomestayManagement/upload_success.html', {})


def map_view(request):
    return render(request, 'HomestayManagement/map.html', {})
