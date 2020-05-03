from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, get_user_model, logout
from django.urls import reverse

from .forms import CustomUserCreationForm, CustomUserLoginForm, EditProfileForm, ProfileForm
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from .tokens import account_activation_token
from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.contrib.auth.decorators import login_required
from .validators import validate_user_id


# View cho trang login
def login_view(request):
    if request.method == 'POST':
        form = CustomUserLoginForm(request.POST)
        if form.is_valid():
            user = authenticate(email=form.cleaned_data['email'], password=form.cleaned_data['password'])
            print(user)
            if user is not None:
                login(request, user)
                print(request.GET)
                return redirect(request.GET.get('next', 'homestay:index'))
    else:
        form = CustomUserLoginForm()
    return render(request, 'user/login.html', {'form': form})


# View cho trang sign up
def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            # Save user object nhưng không đẩy lên database
            user = form.save(commit=False)
            user.is_active = False  # Chưa cho tài khoản này được sử dụng
            user.save()

            # Gen token và gửi email
            current_site = get_current_site(request)
            mail_subject = 'Activate your account.'
            message = render_to_string('user/acc_active_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            to_email = form.cleaned_data.get('email')
            email = EmailMessage(
                mail_subject, message, to=[to_email]
            )
            email.send()

            # Gửi phản hồi
            return HttpResponse('Please confirm your email address to complete the registration')
    else:
        form = CustomUserCreationForm()
    return render(request, 'user/signup.html', {'form': form})


# View kích hoạt email
# Người dùng truy cập link verify trong email sẽ được chuyển đến đây
# Hàm nhận 3 tham số request, id user, token để verify
def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))  # Decode uid
        user = get_user_model().objects.get(pk=uid)  # get user từ uid
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    # Kiểm tra token có đúng không
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')


# Khi người dùng nhập email để đăng kí kiểm tra email hợp lệ ở đây rồi báo trực tiếp về client
# Chắc nên chuyển thành code Js đặt ở browser
def validate_ajax_answer(request):
    print(request.POST)
    check_email = request.POST.get('isEmail', None)
    value = request.POST.get('value', None)
    data = {
        'available': validate_user_id(value, check_email == 'true')
    }
    print(data)
    return JsonResponse(data)


# View log out
@login_required
def logout_view(request):
    logout(request)
    return redirect("homestay:index")

@login_required
def edit_profile(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user)
        profile_form = ProfileForm(request.POST, request.FILES, instance=request.user.userprofile)  # request.FILES is show the selected image or file
        if form.is_valid() and profile_form.is_valid():
            user_form = form.save()
            custom_form = profile_form.save(False)
            custom_form.user = user_form
            custom_form.save()
            return HttpResponse('Success')
        
    else:
        form = EditProfileForm(instance=request.user)
        profile_form = ProfileForm(instance=request.user.userprofile)
    return render(request, 'user/edit_profile.html', {'form': form, 'profile_form': profile_form})