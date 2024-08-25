from django import forms
from django.contrib import admin
from .models import Note, Monograph, Publications
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.utils.translation import gettext_lazy as _

class BaseModelAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = Note
        fields = '__all__'


class NoteAdmin(admin.ModelAdmin):
    form = BaseModelAdminForm

admin.site.register(Note, NoteAdmin)
admin.site.register(Monograph, NoteAdmin)
admin.site.register(Publications, NoteAdmin)

admin.site.site_header = _("Администрирование ИРЭИ")
admin.site.site_title = _("Админ-панель ИРЭИ")
admin.site.index_title = _("Добро пожаловать в админ-панель ИРЭИ")
