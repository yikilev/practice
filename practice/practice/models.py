from django.db import models

class Note(models.Model):
    title = models.TextField(null=True)
    date = models.DateField(null=True, blank=True)
    text = models.TextField(null=True)
    photo = models.ImageField(upload_to='photos/')

    def short_text(self):
        return ' '.join(self.text.split()[:15]) + '...'