#!/bin/bash

# --- 설정 ---
THUMB_WIDTH="150"  # 썸네일 가로 크기 (px). 필요하면 조절하세요.
QUALITY="80"       # 압축 품질 (0~100)
SUFFIX="_thumb"    # 파일명 뒤에 붙을 접미사
# -------------

# ImageMagick 설치 확인
if ! command -v magick &> /dev/null; then
    echo "❌ Error: ImageMagick이 설치되어 있지 않습니다."
    echo "    Mac: brew install imagemagick"
    echo "    Linux: sudo apt install imagemagick"
    exit 1
fi

echo "🖼️  썸네일 생성을 시작합니다... (목표 크기: 가로 ${THUMB_WIDTH}px)"

# 현재 폴더의 모든 .webp 파일 순회
for file in *.webp; do
    # 파일이 존재하는지 확인
    [ -e "$file" ] || continue

    # 이미 썸네일인 파일(_thumb가 포함된 파일)은 건너뛰기
    if [[ "$file" == *"$SUFFIX.webp" ]]; then
        continue
    fi

    # 새 파일명 생성 (예: photo1.webp -> photo1_thumb.webp)
    filename="${file%.*}"
    outfile="${filename}${SUFFIX}.webp"

    # 이미지 변환 실행
    # -resize: 크기 조절
    # -strip: 불필요한 메타데이터 제거 (용량 감소)
    # -quality: 품질 설정
    magick "$file" -resize "${THUMB_WIDTH}x" -strip -quality "$QUALITY" "$outfile"

    echo "✅ 생성 완료: $outfile"
done

echo "🎉 모든 작업이 끝났습니다!"
