#!/usr/bin/env bash
# Uses gcc to assemble a C++ source file, outputs assembly code (.asm) and object file (.o)

# PRIMARY COLORS
BLACK='\033[0;30m'
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
LIGHT_GRAY='\033[0;37m'
# SECONDARY COLORS
DARK_GRAY='\033[1;30m'
LIGHT_RED='\033[1;31m'
LIGHT_GREEN='\033[1;32m'
YELLOW='\033[1;33m'
LIGHT_BLUE='\033[1;34m'
LIGHT_PURPLE='\033[1;35m'
LIGHT_CYAN='\033[1;36m'
WHITE='\033[1;37m'
# DEFAULT TEXT COLOR
DEFAULT='\033[0m' # No Color

# Get working directory and store it as a local variable
working_directory=`pwd`
# Store 1st argument as the file to assemble
source_file=$1
# Pass "nd" without quotes as 2nd argument to disable most debugging
concise_logging=$2
# Get length of filename
n_chars=${#source_file}

# Print error and exit if filename is smaller than 5 characters
if [[ $n_chars -lt 5 ]]; then
	printf "${LIGHT_PURPLE}Error: ${YELLOW}Filename must be at least 5 characters long ${WHITE}(length = $n_chars)\n\n"
	exit
else
	# Get the last 3 characters of the input filename and store as its extension (cpp)
	extension=${source_file:(-3):3}
fi
# Print an error and exit if the file doesn't exist
if [[ ! -e $source_file ]]; then
	printf "${LIGHT_PURPLE}Error: ${YELLOW}File not found ${WHITE}($source_file)\n\n"
	exit
fi

# Print ASCII art title screen with $source_file ($1) filling the bottom line
printf ${LIGHT_CYAN}
printf "████████   ██     ██\n"
printf "█        ██████ ██████\n"
printf "█   ████   ██     ██\n"
printf "█      █\n"
printf "████████ ${GREEN}$source_file\n"
printf "${BLUE}————————————————————————————————————————————————————————————————————————————————\n"

# Print an error if file extension is not cpp
if [[ $extension != "cpp" ]]; then
		printf "${LIGHT_PURPLE}Error: ${YELLOW}Enter a C++ source file as a parameter to assemble it (.cpp)\n"
		# Print an example of valid input
		printf "${WHITE}Example: ${LIGHT_GREEN}user"
		printf "@host${DEFAULT}:${LIGHT_BLUE}~${DEFAULT}"
		printf "$ ./assemble_cpp.sh hello_world.cpp █${LIGHT_CYAN}\n"
else
	printf ${DEFAULT}
	# Remove the last 4 characters (.cpp) and store value as outfile name
	out_file=${source_file::-4}
	# Set backup filenames for filename.asm and filename.o
	asm_log=$out_file.asm
	asm_backup=$asm_log.bak
	out_file=$out_file.o
	object_backup=$out_file.bak
	# If filename.o exists then back it up to filename.o.bak
	if [[ -e $out_file ]]; then
		printf "${YELLOW}Copied $out_file to $object_backup\n"
		cp "$out_file" "$object_backup"
		# Delete the original object file
		rm $out_file
		# If filename.asm exists then back it up to filename.asm.bak
		if [[ -e $asm_log ]]; then
			printf "${LIGHT_RED}Copied $asm_log to $asm_backup\n"
			cp "$asm_log" "$asm_backup"
			# Delete the original assembly instructions file
			rm $asm_log
		fi
	fi
	# Prompt user to confirm file is ready to assemble
	printf "${DEFAULT}"
	printf "Run assembler? [Y/n] "
	read white_rabbit_object
	# Accept common variants of yes
	if [[  $white_rabbit_object == "Y"  || $white_rabbit_object == "y" || $white_rabbit_object == "yes" ]]; then
		# Notify user with color-coded output
		printf ${LIGHT_GREEN}
		printf "Assembling "
		printf ${LIGHT_RED}
		printf "$source_file"
		printf ${LIGHT_GREEN}
		printf " and saving outfile as "
		printf ${WHITE}
		printf "$out_file\n"
		printf "${DEFAULT}\n"
		# Run gcc C++ compiler with parameters to assemble source file
		# Arguments # -v = , -c = , -Wa = , -alh = 
#		g++ -v -c -Wa,-alh 2>&1 | tee $out_file.log
		g++ -v -c -Wa,-alh $source_file >> $asm_log
		printf "\n"
		printf "${LIGHT_RED}Assembly instructions written to: ${YELLOW}$asm_log\n"
		printf ${ORANGE}
		printf $out_file
		printf ${DEFAULT}
		printf " has been saved to "
		printf  ${LIGHT_GREEN}
		printf "$working_directory\n\n"
	fi

fi

exit
