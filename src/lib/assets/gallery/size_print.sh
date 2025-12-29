#!/bin/bash

for file in *.webp; do
  [ -e "$file" ] || continue
  identify -format "%f : %w x %h\n" "$file"
done