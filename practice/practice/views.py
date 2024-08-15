from django.shortcuts import render
from datetime import datetime
import locale
from django.http import JsonResponse
import pytz

def main_page(request):
    locale.setlocale(locale.LC_TIME, 'ru_RU.UTF-8')
    tz = pytz.timezone('Europe/Moscow')
    current_time = datetime.now(tz)
    context = {
        'current_day': current_time.strftime("%A"),
        'current_date': current_time.strftime("%d %B %Y"),
        'current_time': current_time.strftime("%H : %M : %S")
    }
    return render(request, 'main_page.html', context)

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