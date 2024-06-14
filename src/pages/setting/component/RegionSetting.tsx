import { notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { districtApi } from '../../../apis/districtApi';
import { regionApi } from '../../../apis/regionApi';
import { storeApi } from '../../../apis/storeApi';
import Images from '../../../assets/gen';
import { BaseText } from '../../../components';
import { BaseInput } from '../../../components/input/BaseInput';
import { classNames } from '../../../utils/common';
import { showError } from '../../../utils/showToast';

export const RegionSetting = () => {
    const fileExcelRef = useRef<any>(null);
    const [valueRegion, setValueRegion] = useState('korean');
    const [listRegion, setListRegion] = useState<any>([]);
    const [listDistrict, setListDistrict] = useState<any>([]);
    const [regionSelected, setRegionSelected] = useState<any>({
        name: '',
        id: ''
    });
    const [districtSelected, setDistrictSelected] = useState<any>({
        name: '',
        id: ''
    });

    const [isCreatingRegionName, setIsCreatingRegionName] = useState(false);
    const [isEditingRegionName, setIsEditingRegionName] = useState(false);
    const [newRegionName, setNewRegionName] = useState('');
    const [valueInputCreateRegion, setValueInputCreateRegion] = useState('');

    const [isCreatingDistrictName, setIsCreatingDistrictName] = useState(false);
    const [isEditingDistrictName, setIsEditingDistrictName] = useState(false);
    const [newDistrictName, setNewDistrictName] = useState('');
    const [valueInputCreateDistrict, setValueInputCreateDistrict] = useState('');

    const getListRegion = async () => {
        try {
            const resListRegion: any = await regionApi.getList({
                limit: 50,
                fields: '["$all"]',
            });
            if (resListRegion?.code === 200) {
                console.log("resListRegion: ", resListRegion);
                setListRegion(resListRegion?.results?.objects?.rows || []);
                resListRegion?.results?.objects?.rows.length > 0 && setRegionSelected(resListRegion?.results?.objects?.rows[0]);
            }
        } catch (error: any) {
            console.log("err getList Group: ", error);
        }
    };
    const getListDistrict = async () => {
        try {
            const resListDistrict: any = await districtApi.getList({
                limit: 50,
                fields: '["$all"]',
                filter: JSON.stringify({ setting_province_id: regionSelected.id }),
            });
            if (resListDistrict?.code === 200) {
                console.log("resListDistrict: ", resListDistrict);
                setListDistrict(resListDistrict?.results?.objects?.rows || []);
            }
        } catch (error: any) {
            console.log("err getList Group: ", error);
        }
    };

    //upload excel
    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        try {
            const file = event.target.files?.[0];
            if (file) {
                const response: any = await storeApi.uploadExcel(file);
                if (response.code === 200) {
                    notification.success({
                        message: "Upload Excell Success",
                    });
                }
            }
        } catch (error) {
            showError(error);
        }
    };

    //province
    const handleCreateRegion = async () => {
        if (valueInputCreateRegion.trim() === "") {
            setIsCreatingRegionName(false);
            return;
        }
        const res: any = await regionApi.create({ name: valueInputCreateRegion });
        if (res.code === 200) {
            getListRegion();
            setValueInputCreateRegion("");
            setIsCreatingRegionName(false);
        } else {
            console.log("err: ", res);
            setIsCreatingRegionName(false);
        }
    };

    const handleEditRegionName = () => {
        setIsEditingRegionName(true);
        setNewRegionName(regionSelected.name);
    };

    const handleSaveRegionName = async () => {
        if (newRegionName === "" || newRegionName === regionSelected.name) {
            setNewRegionName(regionSelected.name);
            setIsEditingRegionName(false);
            return;
        }
        const resEditRegion: any = await regionApi.update(
            regionSelected.id.toString(),
            { name: newRegionName.trim() }
        );
        if (resEditRegion?.code === 200) {
            const updatedRegions = listRegion.map((region: any) => {
                if (region.id === regionSelected.id) {
                    setRegionSelected({ ...region, name: newRegionName.trim() });
                    return { ...region, name: newRegionName.trim() };
                }
                return region;
            });
            setListRegion(updatedRegions);
        }
        setIsEditingRegionName(false);
    };

    const handleUpRegion = async (region: any) => { };

    const handleDownRegion = async (region: any) => { };

    const handleDeleteRegion = async (region: any) => {
        try {
            const resDeleteRegion: any = await regionApi.delete(region.id.toString());
            if (resDeleteRegion?.code === 200) {
                const updatedRegions = listRegion.filter(
                    (item: any) => item.id !== region.id
                );
                setListRegion(updatedRegions);
                setRegionSelected(updatedRegions[0]);
                setIsEditingRegionName(false);
            }
        } catch (error: any) {
            console.log("err delete region: ", error);
        }
    };

    //district
    const handleCreateDistrict = async () => {
        if (valueInputCreateDistrict.trim() === "") {
            setIsCreatingDistrictName(false);
            return;
        }
        const res: any = await districtApi.create({ name: valueInputCreateDistrict, setting_province_id: regionSelected.id });
        if (res.code === 200) {
            getListDistrict();
            setValueInputCreateDistrict("");
            setIsCreatingDistrictName(false);
        } else {
            console.log("err: ", res);
            setIsCreatingDistrictName(false);
        }
    };

    const handleEditDistrictName = () => {
        setIsEditingDistrictName(true);
        setNewDistrictName(districtSelected.name);
    };

    const handleSaveDistrictName = async () => {
        if (newDistrictName === "" || newDistrictName === districtSelected.name) {
            setNewDistrictName(districtSelected.name);
            setIsEditingDistrictName(false);
            return;
        }
        const resEditDistrict: any = await districtApi.update(
            districtSelected.id.toString(),
            {
                name: newDistrictName.trim(),
            }
        );
        if (resEditDistrict?.code === 200) {
            const updatedDistricts = listDistrict.map((District: any) => {
                if (District.id === districtSelected.id) {
                    setDistrictSelected({ ...District, name: newDistrictName.trim() });
                    return { ...District, name: newDistrictName.trim() };
                }
                return District;
            });
            setListDistrict(updatedDistricts);
        }
        setIsEditingDistrictName(false);
    };

    const handleUpDistrict = async (district: any) => { };

    const handleDownDistrict = async (district: any) => { };

    const handleDeleteDistrict = async (district: any) => {
        try {
            const resDeleteDistrict: any = await districtApi.delete(district.id.toString());
            if (resDeleteDistrict?.code === 200) {
                const updatedDistricts = listDistrict.filter(
                    (item: any) => item.id !== district.id
                );
                setListDistrict(updatedDistricts);
                setDistrictSelected(updatedDistricts[0]);
                setIsEditingDistrictName(false);
            }
        } catch (error: any) {
            console.log("err delete District: ", error);
        }
    };

    useEffect(() => {
        getListRegion();
    }, []);

    useEffect(() => {
        if (regionSelected.id) {
            getListDistrict();
        }
    }, [regionSelected]);


    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-2 border rounded-full w-fit'>
                <div className={`flex-1 p-2 ${valueRegion === 'korean' ? 'bg-black rounded-full' : ''}`} onClick={() => { setValueRegion('korean') }}>
                    <BaseText
                        locale
                        medium
                        className={`${valueRegion === 'korean' ? 'text-white' : 'text-black'}`}
                    >
                        Korean
                    </BaseText>
                </div>
                <div className={`flex-1 p-2 ${valueRegion === 'global' ? 'bg-black rounded-full' : ''}`} onClick={() => { setValueRegion('global') }}>
                    <BaseText
                        locale
                        medium
                        className={`${valueRegion === 'global' ? 'text-white' : 'text-black'}`}
                    >
                        Global
                    </BaseText>
                </div>
            </div>

            <div className='flex justify-between'>
                <div
                    className="flex gap-2 justify-center px-4 py-2.5 rounded-xl border-2 border-gray-200 border-solid cursor-pointer"
                    onClick={() => {
                        fileExcelRef?.current?.click();
                    }}
                >
                    <img
                        src={Images.uploadExcel}
                        alt="Excel upload"
                        className="w-6 h-6 shrink-0 aspect-square"
                    />
                    <BaseText locale>Upload Excel</BaseText>
                    <input
                        ref={fileExcelRef}
                        // onChange={handleFileChange}
                        id="fileExcel"
                        type="file"
                        className="hidden"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                </div>
                {/* <CustomButton
                    className="py-6"
                    onClick={() => {
                        console.log('Update');
                    }}
                    locale
                    primary
                    bold
                >
                    Update
                </CustomButton> */}
            </div>

            <div className="flex">
                <div className="w-1/4">
                    <div className='max-h-[500px] flex-col pr-2 overflow-auto border-r '>
                        {
                            listRegion.map((item: any, index: number) => {
                                const checkSelected =
                                    regionSelected && regionSelected.id === item.id;
                                return (
                                    <div
                                        key={index}
                                        className={classNames('flex py-[10px] justify-between', (!isEditingRegionName && checkSelected && !isCreatingRegionName) ? 'bg-darkNight900 rounded-xl' : '')}
                                        onClick={() => { setRegionSelected(item) }}
                                        onDoubleClick={handleEditRegionName}
                                    >
                                        {(isEditingRegionName && checkSelected) ? (
                                            <div className='flex items-center justify-between flex-1 pr-4 border rounded-lg border-dayBreakBlue500'>
                                                <BaseInput
                                                    value={newRegionName}
                                                    onChange={(value) => setNewRegionName(value)}
                                                    // onBlur={handleSaveRegionName}
                                                    onSave={handleSaveRegionName}
                                                    autoFocus
                                                    styleInputContainer="w-full font-medium bg-white border-none text-darkNight900"
                                                    styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                                                />
                                                {!isCreatingRegionName && checkSelected && (
                                                    <div className='flex gap-1'>
                                                        {/* <div onClick={() => handleUpRegion(item)}>
                                                            <img
                                                                src={Images.arrowUp2}
                                                                className="w-6 h-6 cursor-pointer"
                                                            />
                                                        </div>
                                                        <div onClick={() => handleDownRegion(item)}>
                                                            <img
                                                                src={Images.arrowDown2}
                                                                className="w-6 h-6 cursor-pointer"
                                                            />
                                                        </div> */}
                                                        <div onClick={() => handleDeleteRegion(item)}>
                                                            <img
                                                                src={Images.trash}
                                                                className="w-6 h-6 cursor-pointer"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex justify-between w-full px-4">
                                                <BaseText locale size={16} bold className={classNames(!isCreatingRegionName && checkSelected && !isCreatingRegionName ? 'text-white' : '')}>
                                                    {item.name}
                                                </BaseText>
                                                {!isCreatingRegionName && checkSelected &&
                                                    <img
                                                        src={Images.edit2White}
                                                        alt="Excel upload"
                                                        className="w-6 h-6 text-white cursor-pointer"
                                                        onClick={handleEditRegionName}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        }
                        {isCreatingRegionName && (
                            <div
                                className={classNames(
                                    "flex items-center mb-2 cursor-pointer"
                                )}
                                onClick={() => { }}
                            >
                                <BaseInput
                                    value={valueInputCreateRegion}
                                    onChange={(value) => setValueInputCreateRegion(value)}
                                    placeholder="Enter province name"
                                    // onBlur={handleCreateRegion}
                                    onSave={handleCreateRegion}
                                    autoFocus
                                    className='w-full'
                                    styleInputContainer="w-full font-medium bg-white border rounded-lg border-dayBreakBlue500 text-darkNight900"
                                    styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                                />
                            </div>
                        )}
                    </div>
                    <div className='mt-2 cursor-pointer' onClick={() => { setIsCreatingRegionName(true) }}>
                        <BaseText locale size={16} bold className='text-primary'>
                            + Create one more
                        </BaseText>
                    </div>
                </div>
                <div className='w-3/4'>
                    <div className="max-h-[500px] px-3 overflow-auto">
                        {
                            listDistrict.map((item: any, index: number) => {
                                const checkSelected =
                                    districtSelected && districtSelected.id === item.id;
                                return (
                                    <div
                                        key={index}
                                        className={classNames('flex py-[10px] justify-between', (!isEditingDistrictName && checkSelected && !isCreatingDistrictName) ? 'bg-darkNight100 rounded-lg' : '')}

                                        onClick={() => { setDistrictSelected(item) }}
                                        onDoubleClick={handleEditDistrictName}
                                    >
                                        {(isEditingDistrictName && checkSelected) ? (
                                            <div className='flex items-center justify-between flex-1 pr-4 border rounded-lg border-dayBreakBlue500'>
                                                <BaseInput
                                                    value={newDistrictName}
                                                    onChange={(value) => setNewDistrictName(value)}
                                                    // onBlur={handleSaveDistrictName}
                                                    onSave={handleSaveDistrictName}
                                                    autoFocus
                                                    styleInputContainer="w-full font-medium bg-white border-none text-darkNight900"
                                                    styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                                                />
                                                {!isCreatingDistrictName && checkSelected && (
                                                    <div className='flex gap-1'>
                                                        {/* <div onClick={() => handleUpDistrict(item)}>
                                                            <img
                                                                src={Images.arrowUp2}
                                                                className="w-6 h-6 cursor-pointer"
                                                            />
                                                        </div>
                                                        <div onClick={() => handleDownDistrict(item)}>
                                                            <img
                                                                src={Images.arrowDown2}
                                                                className="w-6 h-6 cursor-pointer"
                                                            />
                                                        </div> */}
                                                        <div onClick={() => handleDeleteDistrict(item)}>
                                                            <img
                                                                src={Images.trash}
                                                                className="w-6 h-6 cursor-pointer"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="flex justify-between w-full px-2 ">
                                                <BaseText locale size={16} bold className={classNames(!isCreatingDistrictName && checkSelected && !isCreatingDistrictName ? 'text-primary' : '')}>
                                                    {item.name}
                                                </BaseText>
                                                {!isCreatingDistrictName && checkSelected &&
                                                    <img
                                                        src={Images.edit2}
                                                        alt="Excel upload"
                                                        className="w-6 h-6 text-white cursor-pointer"
                                                        onClick={handleEditDistrictName}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </div>
                                )
                            })
                        }
                        {isCreatingDistrictName && (
                            <div
                                className={classNames(
                                    "flex items-center mb-2 cursor-pointer"
                                )}
                                onClick={() => { }}
                            >
                                <BaseInput
                                    value={valueInputCreateDistrict}
                                    onChange={(value) => setValueInputCreateDistrict(value)}
                                    placeholder="Enter district name"
                                    // onBlur={handleCreateRegion}
                                    onSave={handleCreateDistrict}
                                    autoFocus
                                    className='w-full'
                                    styleInputContainer="w-full font-medium bg-white border rounded-lg border-dayBreakBlue500 text-darkNight900"
                                    styleInput="w-full bg-white focus:outline-none font-medium text-darkNight900"
                                />
                            </div>
                        )}
                    </div>
                    <div
                        className='mt-2 ml-2 cursor-pointer'
                        onClick={() => { setIsCreatingDistrictName(true) }}
                    >
                        <BaseText locale size={16} bold className='text-primary'>
                            + Create one more
                        </BaseText>
                    </div>
                </div>
            </div>
        </div>
    );
};