from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required(login_url='/')
def dashboard(request):
    # Datos de ejemplo para el dashboard
    stats = {
        'completed_orders': 12,
        'pending_orders': 5,
        'approved_payments': 8,
        'pending_payments': 3
    }
    
    # Enviar los datos al template
    return render(request, 'dashboard.html', {
        'stats': stats
    })