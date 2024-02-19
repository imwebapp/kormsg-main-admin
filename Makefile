gen-images:
	src/assets/gen/generate-images src/assets/images --prefix ../ > src/assets/gen/index.tsx   
	cat src/assets/gen/index.tsx