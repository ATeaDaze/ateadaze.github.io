#!/usr/bin/env bash
# Uses gcc to compile a C++ source file and outputs log

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
# Get username and...
current_user=`whoami`
# Hostname for example bash prompt
current_host=`hostname`
# Store 1st argument as the file to assemble
source_file=$1
# Get length of filename
n_chars=${#source_file}

# Print error and exit if filename is smaller than 5 characters
if [[ $n_chars -lt 5 ]]; then
	printf "${LIGHT_PURPLE}Error! ${YELLOW}Filename must be at least 5 characters long ${ORANGE}(length = $n_chars)\n\n"
	exit
else
	# Get the last 3 characters of the input filename and store as its extension (cpp)
	extension=${source_file:(-3):3}
fi
# Print an error and exit if the file doesn't exist
if [[ ! -e $source_file ]]; then
	printf "${LIGHT_PURPLE}Error! ${YELLOW}File not found ($source_file)\n\n"
	exit
fi

# Print ASCII art title screen with $source_file ($1) filling the bottom line
printf ${GREEN}
printf "████████   ██     ██\n"
printf "█        ██████ ██████\n"
printf "█   ████   ██     ██\n"
printf "█      █\n"
printf "████████ ${LIGHT_CYAN}$source_file\n"
printf ${BLUE}
printf '%s\n' '--------------------------------------------------------------------------------'

if [[ $extension != "cpp" ]]; then
		printf "${LIGHT_PURPLE}Error! ${YELLOW}Enter a C++ source file as a parameter to compile it (.cpp)\n"
		# Print an example of valid input
		printf "${WHITE}Example: ${LIGHT_GREEN}$current_user"
		printf "@$current_host${DEFAULT}:${LIGHT_BLUE}~${DEFAULT}"
		printf "$ ./compile.sh hello_world.cpp █${LIGHT_CYAN}\n"
	else
	# Remove the last 4 characters (.cpp) and store value as outfile name
	out_file=${source_file::-4}
  # Set backup filenames for filename.asm and filename.o
  cpp_backup=$source_file.bak
  out_file_backup=$out_file.bak
  # If filename.o exists then back it up to filename.o.bak
  if [[ -e $out_file ]]; then
    printf "${DEFAULT}Copied binary ${ORANGE}$out_file ${DEFAULT}to ${YELLOW}$out_file_backup\n"
    cp "$out_file" "$out_file_backup"
    # Delete the original object file
    rm $out_file
  fi
	# Prompt user to confirm file is ready to assemble
	printf "${DEFAULT}"
	printf "Run complier? [Y/n] "
	read white_rabbit_object
	# Accept common variants of yes
	if [[  $white_rabbit_object == "Y"  || $white_rabbit_object == "y" || $white_rabbit_object == "yes" ]]; then
		# Notify user with color-coded output
		printf ${LIGHT_CYAN}
		printf "Compiling "
		printf ${LIGHT_RED}
		printf "$source_file"
		printf ${LIGHT_CYAN}
		printf " and saving binary as "
		printf ${WHITE}
		printf "$out_file...\n\n"
		printf ${DEFAULT}
		# -o = outfile, -v = verbose, last command outputs build messages to a .log file
		g++ $source_file -o $out_file -v 2>&1 | tee $out_file-build.log
		# Print location of outfile and directory
		printf ${ORANGE}
		printf "\n$out_file"
		printf ${DEFAULT}
		printf " has been saved to "
		printf ${LIGHT_GREEN}
		printf "$working_directory\n\n"
	fi

fi
exit
