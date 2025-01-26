#!/usr/bin/bash
# bash color table: lists available colors for terminal

# Set default console text color (bold and underline don't work in WSL)
DEFAULT='\033[0m'
BOLD='\033[1m'
UNDERLINE='\033[4m'

# Declare array of 16 colors codes (0;30 to 1;37)
color_list=(	'\033[0;30m' '\033[1;30m' '\033[0;31m' '\033[1;31m'
		'\033[0;32m' '\033[1;32m' '\033[0;33m' '\033[1;33m'
		'\033[0;34m' '\033[1;34m' '\033[0;35m' '\033[1;35m'
		'\033[0;36m' '\033[1;36m' '\033[0;37m' '\033[1;37m' )
# Store '\033[0m' as a string so it can be output with `echo`
current_color_code=${DEFAULT}

# Store value of 1st argument taken from terminal
arg1=$1
# Run in text mode by default (1 = text mode, 0 = line/solid bar mode)
b_text_mode=1
# Set default message to print in text mode
test_message="The quick brown fox jumps over the lazy dog █"

# Enable line mode if the 1st argument is valid (l, -l, list)
if [[ ( $arg1 == "l" ) || ( $arg1 == "-l" ) || ( $arg1 == "list" ) ]]; then
	b_text_mode=0
fi

# Draw a line of text or solid bar
function draw_line()
{
	# Left column
	printf "█ "
	# Print the color code for this line ()
	echo -n $current_color_code
	# Print output as text if enabled
	if [[ $b_text_mode == 1 ]]; then
		printf " █ "
		printf "$test_message"
	# Print output as a solid bar if not
	else
		printf " ██"
		printf "█████████████████████████████████████████████"
	fi
	printf "\n"
}

# Print header (with BONUS convoluted color codes)
printf "${color_list[1]}▄▄▄ ${DEFAULT}CODE ${color_list[1]}"
printf "▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ${DEFAULT}TEST OUTPUT ${color_list[1]}▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\n"

# Go through each color in the array ($color_list[0:15], 16 colors)
for i in "${color_list[@]}"; do
	# Store current color code as string (so it can be output later)
	current_color_code=$i
	# Set text color to the current color code (color_list[i])
  	printf $i
 	# Draw a line of text or a solid bar (depending on the value of b_text_mode)
  	draw_line
  done

# Check if text mode is enabled
if [[ $b_text_mode == 1 ]]; then
		# Print an ASCII table footer if text mode is enabled
		printf "█▄▄▄▄▄▄▄▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█\n"
		# Print instructions on how to use the other mode on exit
		printf ${color_list[8]}
		printf "Text mode enabled "
		printf ${DEFAULT}
		printf "(enable line mode by running with l as the first parameter)\n"
		printf ${color_list[3]}
		printf "Example: "
		printf ${color_list[12]}
		printf "$0 l"
	else
		# Print a solid ASCII bar if line mode is enabled
		printf "████████████████████████████████████████████████████████████\n"
		printf ${color_list[8]}
		printf "Line mode enabled "
		printf ${DEFAULT}
		printf "(enable text mode by running with no parameters)\n"
		printf ${color_list[3]}
		printf "Example: "
		printf ${color_list[12]}
		printf "$0"
	fi
printf "\n\n"

