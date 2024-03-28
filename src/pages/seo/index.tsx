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
    MetaCode: '',
  })

  const handleChange = (key: string, value: string) => {
    setDataSeo({ ...dataSeo, [key]: value })
  }

  return (
    <div
      className='p-8 m-6 border rounded-lg flex flex-col gap-[20px]'
    >
      <BaseInput
        title='Site Name'
        placeholder='Site name'
        value={dataSeo.siteName}
        onChange={(value) => handleChange('siteName', value)}
      />
      <BaseInput
        title='Site Description'
        placeholder='Site Description'
        value={dataSeo.siteDescription}
        onChange={(value) => handleChange('siteDescription', value)}
      />

      <div className='flex flex-col gap-2'>
        <BaseText locale bold size={14}>
          Meta Keyword
        </BaseText>
        <BaseText locale bold size={14} className='text-red-500'>
          *Please enter keywords related to the website separated by commas(,) (Robot meta tag)
        </BaseText>
        <BaseInput
          placeholder='Meta Keyword'
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
              >
                Upload new picture
              </CustomButton>
              <CustomButton
                bold
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
          <div className='h-[120px] w-[120px] flex justify-center items-center rounded-lg border-dashed border-2'>
            <img src={Images.uploadCloudIcon} />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-3'>
              <CustomButton
                primary
                icon={<PlusOutlined />}
                bold
              >
                Upload new picture
              </CustomButton>
              <CustomButton
                bold
              >
                Remove
              </CustomButton>
            </div>
            <BaseText locale bold size={14} className='text-red-500'>
              *Recommended resolution: 512 X512 PNG/ Favicion: 200X200/ PNG
            </BaseText>
          </div>
        </div>
      </div>

      <BaseInput
        title='Meta Code'
        placeholder='Meta Code'
        value={dataSeo.MetaCode}
        onChange={(value) => handleChange('MetaCode', value)}
        textArea
      />
      <BaseText locale bold size={14} color='text-darkNight700'>
        Insert the meta tag for ownership for Naver and Google Webmaster Tools here.
      </BaseText>

    </div>
  )
}

export default SeoPage