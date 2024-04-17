import React, { useState } from 'react'
import { BaseInput } from '../../components/input/BaseInput'
import { BaseText, CustomButton } from '../../components'
import Images from '../../assets/gen'
import { PlusOutlined } from '@ant-design/icons';

const SeoPage = () => {
  const [dataSeo, setDataSeo] = useState({
    siteName: '',
    siteDescription: '',
    metaKeyword: '',
    favicon: '',
    avatar: '',
    metaCode: '',
  })
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setDataSeo({ ...dataSeo, [key]: value })
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event?.target?.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setDataSeo({ ...dataSeo, avatar: imageUrl });
      setSelectedAvatar(imageUrl);
    }
  };

  const handleSubmit = () => {
    console.log('dataSeo', dataSeo)
  };

  return (
    <div className='flex flex-col gap-3 p-6'>
      <div
        className='p-8 border rounded-lg flex flex-col gap-[20px]'
      >
        <BaseInput
          title='Site name'
          placeholder='Site name'
          value={dataSeo.siteName}
          onChange={(value) => handleChange('siteName', value)}
        />
        <BaseInput
          title='Site description'
          placeholder='Site description'
          value={dataSeo.siteDescription}
          onChange={(value) => handleChange('siteDescription', value)}
        />

        <div className='flex flex-col gap-2'>
          <BaseText locale bold size={14}>
            Meta keyword
          </BaseText>
          <BaseText locale bold size={14} className='text-red-500'>
            *Please enter keywords related to the website separated by commas(,) (Robot meta tag)
          </BaseText>
          <BaseInput
            placeholder='Meta keyword'
            value={dataSeo.metaKeyword}
            onChange={(value) => handleChange('metaKeyword', value)}
          />
        </div>
        <div className='flex flex-col gap-3'>
          <BaseText locale bold size={14}>
            Favicon
          </BaseText>
          <div className='flex items-center gap-6'>
            <div className='h-[120px] w-[120px] flex justify-center items-center rounded-lg border-dashed border-2'>
              <img src={Images.uploadCloudIcon} />
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3'>
                <CustomButton
                  primary
                  icon={<PlusOutlined />}
                  bold
                  locale
                >
                  Upload new picture
                </CustomButton>
                <CustomButton
                  bold
                  locale
                >
                  Remove
                </CustomButton>
              </div>
              <BaseText locale bold size={14} className='text-red-500'>
                *Recommended resolution: 512X512 PNG/ 16X16 ICO
              </BaseText>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-3'>
          <BaseText locale bold size={14}>
            Avatar
          </BaseText>
          <div className='flex items-center gap-6'>
            {
              selectedAvatar ? (
                <img src={selectedAvatar} className='h-[120px] w-[120px] items-center rounded-lg' />
              ) : (
                <div className='h-[120px] w-[120px] flex justify-center items-center rounded-lg border-dashed border-2'>
                  <img src={Images.uploadCloudIcon} />
                </div>
              )
            }
            <div className='flex flex-col gap-2'>
              <div className='flex gap-3'>
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} id="upload-avatar" />
                <CustomButton
                  primary
                  icon={<PlusOutlined />}
                  bold
                  locale
                  onClick={() => {
                    const uploadImageInput = document.getElementById('upload-avatar');
                    if (uploadImageInput) {
                      uploadImageInput.click();
                    }
                  }}
                >
                  Upload new picture
                </CustomButton>
                <CustomButton
                  bold
                  locale
                  onClick={() => setSelectedAvatar(null)}
                >
                  Remove
                </CustomButton>
              </div>
              <BaseText locale bold size={14} className='text-red-500'>
                *Recommended resolution: 512 X512 PNG/ Favicon: 200X200/ PNG
              </BaseText>
            </div>
          </div>
        </div>

        <BaseInput
          title='Meta code'
          placeholder='Meta code'
          value={dataSeo.metaCode}
          onChange={(value) => handleChange('metaCode', value)}
          textArea
        />
        <BaseText locale bold size={14} color='text-darkNight700'>
          Insert the meta tag for ownership for Naver and Google Webmaster Tools here.
        </BaseText>
      </div>
      <CustomButton
        className='flex justify-center p-6'
        locale
        primary
        onClick={handleSubmit}
      >
        Save
      </CustomButton>
    </div>
  )
}

export default SeoPage