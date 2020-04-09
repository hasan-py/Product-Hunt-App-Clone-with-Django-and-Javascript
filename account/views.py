from django.shortcuts import redirect
from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib import auth


def signup(request):
	if request.method == 'POST':
		if request.POST['Password1'] == request.POST['Password2'] :
			try :
				user = User.objects.get(username=request.POST['Username'])
				return render(request, 'account/signup.html', {'error':'User name already taken...'})
			except User.DoesNotExist :
				user = User.objects.create_user(username=request.POST['Username'], password=request.POST['Password1'])
				auth.login(request, user)
				return redirect('home')

		else :
			return render(request, 'account/signup.html', {'error':'Password doesn\'t match...'})


	else:
		return render(request, 'account/signup.html')



def login(request):
	
	if request.method == 'POST':
		user = auth.authenticate(username = request.POST['Username'], password = request.POST['Password'])
		if user is not None :
			auth.login(request, user)
			return redirect('home')

		else :
			return render(request, 'account/login.html' , {'error':'Username or Password is incorrect'})

	else :
		return render(request, 'account/login.html')



def logout(request):
	
	if request.method == 'POST':
		auth.logout(request)
		return redirect('home')
