from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Bookings

# Create your views here.
def home(request):
    return render(request, 'index.html')

def book(request):
    name = request.GET.get('name')
    date = request.GET.get('date')
    time = request.GET.get('time')

    isDuplicate = 0
    all_records = Bookings.objects.all()
    
    for record in all_records:
        if str(record.reservation_date) == date and str(record.reservation_slot) == time:
            print(record.reservation_date, date, record.reservation_slot, time)
            # print('Failed')
            data = {
                        "status": "failed",
                        "message": "Booking Failed! Choose any other Timings",
                    }
            # return render(request, 'index.html', data)
            return JsonResponse(data)
        
    new_record = Bookings()
    new_record.first_name = name
    new_record.reservation_date = date
    new_record.reservation_slot = time
    new_record.save()    
    if int(time) <= 12:
        temp = 'AM'
    else:
        temp = 'PM'
    data = {
        "status": "Succecss",
        "message": f'Booking Succecss on "{date}" "{time}{temp}" for "{name}"',
    }
    # return render(request, 'index.html', data)
    return JsonResponse(data)

def bookings_details(request):

    dateParam = request.GET.get('date')
    all_records = Bookings.objects.all()
    if not dateParam:
        saved_bookings = []
        count = 0
        for record in all_records:
            saved_bookings.append(
                {
                    'model':'restaurent.booking', 
                    'pk' : count ,
                    'fields' : {
                        'name' : record.first_name, 
                        'reservation_date' : record.reservation_date, 
                        'reservation_slot' : record.reservation_slot
                        }
                }
            )
            count += 1
    else:
        saved_bookings = []
        count = 1
        for record in all_records:
            if str(record.reservation_date) == dateParam:
                saved_bookings.append(
                    {
                        'model':'restaurent.booking', 
                        'pk' : count ,
                        'fields' : {
                            'name' : record.first_name, 
                            'reservation_date' : record.reservation_date, 
                            'reservation_slot' : record.reservation_slot
                            }
                    }
                )
                count += 1

    return JsonResponse(saved_bookings, safe=False)
    
