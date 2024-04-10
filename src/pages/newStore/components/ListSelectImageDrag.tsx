import React, { useEffect, useState } from 'react';
import { BaseText } from '../../../components';
import Images from '../../../assets/gen';
import { App } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
type ImageOrEmpty = File | null;
interface IProps {
    onImagesChange?: any;
    listImages?: any;
}

export const ListSelectImageDrag = (props: IProps) => {
    const { listImages, onImagesChange } = props;
    const { message } = App.useApp();
    const initialImages = Array.from({ length: 9 }, () => null);
    const [selectedImages, setSelectedImages] = useState<Array<ImageOrEmpty>>(initialImages);

    const handleImageClick = (index: number) => {
        document.getElementById(`file-input-${index}`)?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = event.target.files;
        if (files) {
            if (files.length + selectedImages.filter(img => img !== null).length > 9) {
                message.error('You can only upload up to 9 images');
                return;
            }

            const newSelectedImages = [...selectedImages];
            for (let i = 0; i < files.length; i++) {
                newSelectedImages[index + i] = files[i];
            }
            setSelectedImages(newSelectedImages);
            onImagesChange && onImagesChange(newSelectedImages);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages[index] = null;
        const rearrangedImages = rearrangeArray(newSelectedImages);
        setSelectedImages(rearrangedImages);
        onImagesChange && onImagesChange(rearrangedImages);
    };

    const rearrangeArray = (arr: Array<ImageOrEmpty>): Array<ImageOrEmpty> => {
        const newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i] === null) {
                newArr.splice(i, 1);
                i--;
            }
        }
        return newArr;
    };

    const handleDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        const newSelectedImages = [...selectedImages];
        const movedImage = newSelectedImages.splice(sourceIndex, 1)[0];
        newSelectedImages.splice(destinationIndex, 0, movedImage);
        setSelectedImages(newSelectedImages);
        onImagesChange && onImagesChange(newSelectedImages);
    };

    useEffect(() => {
        if (listImages && listImages.length <= 9) {
            const newSelectedImages = [...initialImages];
            listImages.forEach((image: any, index: number) => {
                newSelectedImages[index] = image;
            });
            setSelectedImages(newSelectedImages);
        } else if (listImages && listImages.length > 9) {
            setSelectedImages(listImages.slice(0, 9));
        }
    }, [listImages]);

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="image-list">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div className='flex flex-col w-2/3 h-[380px]'>
                                <input
                                    id="file-input-0"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 0)}
                                    style={{ display: 'none' }}
                                    multiple
                                />
                                <Draggable draggableId="image-0" index={0}>
                                    {(provided) => (
                                        <div className='w-full h-full' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            {selectedImages[0] && (
                                                <div className="relative flex flex-col items-center justify-center h-full rounded-lg cursor-pointer bg-darkNight50">
                                                    <img
                                                        src={Images.closeCircle}
                                                        className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2"
                                                        alt="closeCircle"
                                                        onClick={() => handleRemoveImage(0)}
                                                    />
                                                    <img
                                                        src={typeof selectedImages[0] === 'string' ? selectedImages[0] : URL.createObjectURL(selectedImages[0]!)}
                                                        className="w-full h-full rounded-lg"
                                                        alt="Image"
                                                        onClick={() => handleImageClick(0)}
                                                    />
                                                </div>
                                            )}
                                            {!selectedImages[0] && (
                                                <div
                                                    className="relative flex flex-col items-center justify-center h-full rounded-lg cursor-pointer bg-darkNight50"
                                                    onClick={() => handleImageClick(0)}>
                                                    <img
                                                        src={Images.exportIcon}
                                                        className="w-8 h-8"
                                                        alt="Image"
                                                    />
                                                    <BaseText locale size={16} bold>대표</BaseText>
                                                </div>

                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            </div>
                            <div className="flex flex-col w-1/3 gap-3">
                                {[1, 2].map((index) => (
                                    <div key={index} className='flex h-[184px]'>
                                        <input
                                            id={`file-input-${index}`}
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, index)}
                                            style={{ display: 'none' }}
                                            multiple
                                        />
                                        <Draggable draggableId={`image-${index}`} index={index}>
                                            {(provided) => (
                                                <div className='w-full' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    {selectedImages[index] && (
                                                        <div className="relative flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-darkNight50">
                                                            <img
                                                                src={Images.closeCircle}
                                                                className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2"
                                                                alt="closeCircle"
                                                                onClick={() => handleRemoveImage(index)}
                                                            />
                                                            {typeof selectedImages[index] === 'string' ? (
                                                                <img
                                                                    src={selectedImages[index] || Images.exportIcon}
                                                                    className="w-full h-full rounded-lg"
                                                                    alt="Image"
                                                                    onClick={() => handleImageClick(index)}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={URL.createObjectURL(selectedImages[index]!)}
                                                                    className="w-full h-full rounded-lg"
                                                                    alt="Image"
                                                                    onClick={() => handleImageClick(index)}
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                    {!selectedImages[index] && (
                                                        <div
                                                            className="relative flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-darkNight50"
                                                            onClick={() => handleImageClick(index)}>
                                                            <img
                                                                src={Images.exportIcon}
                                                                className="w-8 h-8"
                                                                alt="Image"
                                                            />
                                                        </div>

                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 grid-flow-rows min-h-[380px]">
                            {[3, 4, 5, 6, 7, 8].map((index) => (
                                <div key={index} className='flex h-[184px]'>
                                    <input
                                        id={`file-input-${index}`}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, index)}
                                        style={{ display: 'none' }}
                                        multiple
                                    />
                                    <Draggable draggableId={`image-${index}`} index={index}>
                                        {(provided) => (
                                            <div className='w-full' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                {selectedImages[index] && (
                                                    <div className="relative flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-darkNight50">
                                                        <img
                                                            src={Images.closeCircle}
                                                            className="absolute z-10 w-8 h-8 cursor-pointer top-2 right-2"
                                                            alt="closeCircle"
                                                            onClick={() => handleRemoveImage(index)}

                                                        />
                                                        <img
                                                            src={typeof selectedImages[index] === 'string' ? (selectedImages[index] || Images.exportIcon) : URL.createObjectURL(selectedImages[index]!)}
                                                            className="w-full h-full rounded-lg"
                                                            alt="Image"
                                                            onClick={() => handleImageClick(index)}
                                                        />
                                                    </div>
                                                )}
                                                {!selectedImages[index] && (
                                                    <div
                                                        className="relative flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-darkNight50"
                                                        onClick={() => handleImageClick(index)}>
                                                        <img
                                                            src={Images.exportIcon}
                                                            className="w-8 h-8"
                                                            alt="Image"
                                                        />
                                                    </div>

                                                )}
                                            </div>
                                        )}
                                    </Draggable>
                                </div>
                            ))}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
};