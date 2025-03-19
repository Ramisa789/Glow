from django.contrib import admin
from django.urls import path
from api.views import home
from api.views import signup
from api.views import user_login
from api.views import generate_response
from api.views import save_routine
from api.views import get_routine

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),  
    path('signup/', signup, name='signup'),
    path('login/', user_login, name='login'),
    path('generate/', generate_response, name='generate_response'),
    path('SaveRoutine/', save_routine, name='save_routine'),
    path('GetRoutine/', get_routine, name='get_routine')
]
