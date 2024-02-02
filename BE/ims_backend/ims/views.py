from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, HttpResponse


# Create your views here.
def index(request):
    return HttpResponse('Test works...')
