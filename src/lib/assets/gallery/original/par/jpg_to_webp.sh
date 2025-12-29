#!/bin/bash

# 매칭되는 파일이 없을 때 패턴 자체를 반환하지 않도록 설정
shopt -s nullglob

# 현재 디렉토리의 모든 JPG 파일을 WebP로 변환
for file in *.jpg *.JPG *.jpeg *.JPEG; do
    # 파일이 실제로 존재하는지 확인
    if [ -f "$file" ]; then
        # 확장자를 제외한 파일명 추출
        filename="${file%.*}"

        # WebP로 변환
        echo "Converting: $file -> ${filename}.webp"
        cwebp -q 85 "$file" -o "${filename}.webp"

        if [ $? -eq 0 ]; then
            echo "✓ Successfully converted: $file"
        else
            echo "✗ Failed to convert: $file"
        fi
    fi
done

echo "Conversion complete!"
