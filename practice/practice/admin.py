from django.contrib import admin
from .models import Note

class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'short_text')
    search_fields = ('title', 'text')

admin.site.register(Note, NewsAdmin)