default: program

program: displaybrightness.c
	gcc -o displaybrightness displaybrightness.c -framework IOKit -framework CoreFoundation -framework ApplicationServices
