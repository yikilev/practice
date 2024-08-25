from django.db import models
from ckeditor.fields import RichTextField
from django.utils.html import strip_tags
import html

class BaseModel(models.Model):
    title = models.TextField(null=True)
    content = RichTextField()
    date = models.DateField(null=True, blank=True)
    photo = models.ImageField(null=True, blank=True, upload_to='photos/')

    def short_text(self):
        plain_text = strip_tags(self.content)
        decoded_text = html.unescape(plain_text)
        return ' '.join(decoded_text.split()[:15]) + '...'
    
    def __str__(self):
        return self.title

    class Meta:
        abstract = True

class Note(BaseModel):
    class Meta:
        verbose_name = "Заметка"
        verbose_name_plural = "Заметки"
    
class Monograph(BaseModel):
    class Meta:
        verbose_name = "Монография"
        verbose_name_plural = "Монографии"

class Publications(BaseModel):
    class Meta:
        verbose_name = "Публикация"
        verbose_name_plural = "Публикации"

class Compound(models.Model):
    name = models.TextField(null=True, blank=True)
    contacts = models.TextField(null=True, blank=True)
    coordinates = models.TextField(null=True, blank=True)


