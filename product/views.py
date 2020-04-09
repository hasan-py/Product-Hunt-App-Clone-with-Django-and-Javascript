from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Product
from django.utils import timezone



def home(request):
	product = Product.objects
	return render(request, "product/home.html" , {'product':product})



@login_required(login_url='/accounts/signup/')
def create(request):
	if request.method == 'POST':
		if request.POST['title'] and request.POST['body'] and request.POST['url'] and request.FILES['icon'] and request.FILES['image'] :
			# -------------this var for take models in here-------------
			product = Product()

			# ----------This logic is for url text------------
			if request.POST['url'].startswith('http://') or request.POST['url'].startswith('https://'):
				product.url = request.POST['url']
			else :
				product.url = 'http://' + request.POST['url']
			

 			# -------------Image and icon object for models-------------
			product.image = request.FILES['image']
			product.icon = request.FILES['icon']

			product.title = request.POST['title']
			product.body = request.POST['body']
			product.pub_date = timezone.datetime.now()
			product.hunter = request.user
			product.save()
			return redirect('/product/' + str(product.id))

		else:
			return render(request, 'product/create.html' , {'error':'Please fill all the Field'})

	else :
		return render(request, 'product/create.html')



def details(request, product_id):
	product = get_object_or_404(Product, pk=product_id)
	return render(request, 'product/details.html', {'product':product})


@login_required(login_url='/accounts/signup/')
def upvote(request,product_id):
	if request.method == 'POST':
		product = get_object_or_404(Product, pk=product_id)
		product.votes_total += 1
		product.save()
		return redirect('/product/' + str(product.id))
	else:
		return redirect('home')
