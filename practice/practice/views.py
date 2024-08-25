from django.shortcuts import render
from datetime import datetime
import locale
from django.http import JsonResponse
import pytz
from .models import Note, Compound
from django.conf import settings

def main_page(request):
    locale.setlocale(locale.LC_TIME, 'ru_RU.UTF-8')
    tz = pytz.timezone('Europe/Moscow')
    current_time = datetime.now(tz)
    news_list = Note.objects.all().order_by("-date")
    context = {
        'current_day': current_time.strftime("%A"),
        'current_date': current_time.strftime("%d %B %Y"),
        'current_time': current_time.strftime("%H : %M : %S"),
        'news_list': news_list,
        'MEDIA_URL': settings.MEDIA_URL
    }
    return render(request, 'main_page.html', context)

def contacts_page(request):
    return render(request, 'contacts.html')

def get_time_data(request):
    locale.setlocale(locale.LC_TIME, 'ru_RU.UTF-8')
    tz = pytz.timezone('Europe/Moscow')
    current_time = datetime.now(tz)
    data = {
        'current_day': current_time.strftime("%A"),
        'current_date': current_time.strftime("%d %B %Y"),
        'current_time': current_time.strftime("%H : %M : %S")
    }
    return JsonResponse(data)

def get_compound_data(request):
    compounds = Compound.objects.all().values()
    compounds_list = list(compounds)
    return JsonResponse(compounds_list, safe=False)