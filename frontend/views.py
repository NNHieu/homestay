from django.shortcuts import render

# Create your views here.


def index(request):
    return render(request, 'frontend/index.html')


def detail(request, pk):
    return render(request, 'frontend/index.html')


def login(request):
    return render(request, 'frontend/login.html')


def signup(request):
    return render(request, 'frontend/signup.html')
