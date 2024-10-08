"""practice URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.main_page, name='main_page'),
    path('get_time_data/', views.get_time_data, name='get_time_data'),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('get_compound_data/', views.get_compound_data, name='get_compound_data'),
    path('contacts/', views.contacts_page, name='contacts_page'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
