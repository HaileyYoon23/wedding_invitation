#!/bin/bash

# WebP 이미지 리사이즈 스크립트
# 현재 폴더의 모든 .webp 파일을 1/2 크기로 리사이즈합니다.

# ImageMagick이 설치되어 있는지 확인
if ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick이 설치되어 있지 않습니다."
    echo "설치 방법: brew install imagemagick"
    exit 1
fi

# 현재 디렉토리에 webp 파일이 있는지 확인
webp_files=(*.webp)
if [ ! -e "${webp_files[0]}" ]; then
    echo "현재 디렉토리에 .webp 파일이 없습니다."
    exit 1
fi

echo "WebP 이미지 리사이즈를 시작합니다..."
echo "크기: 50% (1/2)"
echo ""

# 처리된 파일 수 카운터
count=0

# 현재 디렉토리의 모든 .webp 파일 처리
for file in *.webp; do
    if [ -f "$file" ]; then
        echo "처리 중: $file"
        
        # 원본 파일 크기 확인
        original_size=$(identify -format "%wx%h" "$file" 2>/dev/null)
        
        if [ $? -eq 0 ]; then
            # 50% 크기로 리사이즈 (임시 파일로 저장 후 원본 교체)
            temp_file="${file%.webp}_temp.webp"
            
            convert "$file" -resize 50% "$temp_file"
            
            if [ $? -eq 0 ]; then
                # 새 파일 크기 확인
                new_size=$(identify -format "%wx%h" "$temp_file" 2>/dev/null)
                
                # 원본 파일을 새 파일로 교체
                mv "$temp_file" "$file"
                
                echo "  완료: $original_size → $new_size"
                ((count++))
            else
                echo "  오류: $file 처리 실패"
                # 임시 파일이 있다면 삭제
                [ -f "$temp_file" ] && rm "$temp_file"
            fi
        else
            echo "  오류: $file 정보를 읽을 수 없습니다"
        fi
        
        echo ""
    fi
done

echo "리사이즈 완료!"
echo "처리된 파일 수: $count개"




