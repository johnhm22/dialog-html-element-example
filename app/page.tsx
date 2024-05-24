'use client'

import Image from 'next/image'
import images from '@/data/images.json'
import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

type Image = {
  alt: string
  height: number
  path: string
  width: number
}

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  const [activeImage, setActiveImage] = useState<Image>()

  useEffect(() => {
    if (!activeImage) return
    dialogRef.current?.showModal()
  }, [activeImage])

  const closeDialog = () => {
    dialogRef.current?.close()
    setActiveImage(undefined)
  }

  return (
    <section className='py-24'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
          {images.map(image => (
            <div
              key={image.alt}
              className=''
              onClick={() => setActiveImage(image)}
            >
              <Image
                className='rounded-lg'
                src={image.path}
                alt={image.alt}
                height={image.height}
                width={image.width}
              />
            </div>
          ))}
        </div>
        <dialog
          id='dialog'
          ref={dialogRef}
          className='relative overflow-visible backdrop:bg-black/65'
        >
          <div className='relative z-0'>
            {activeImage && (
              <>
                <Image
                  className=''
                  src={activeImage.path}
                  alt={activeImage.alt}
                  height={600}
                  width={600}
                />
                <button
                  className='z-1 absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 shadow'
                  onClick={closeDialog}
                >
                  <X className='h-4 w-4 text-zinc-900' />
                  <span className='sr-only'>Close</span>
                </button>
              </>
            )}
          </div>
        </dialog>
      </div>
    </section>
  )
}
