
from django.conf import settings
from django.conf.urls.static import static

from django.urls import path
from product import views


urlpatterns = [

    path('create/', views.create, name='create'),
    path('<int:product_id>/', views.details, name='details'),
    path('<int:product_id>/upvote', views.upvote, name='upvote'),
    


    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

