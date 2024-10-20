import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import ArrowIosBack from '@/../public/assets/components/ArrowIosBack';
import ArrowIosForward from '@/../public/assets/components/ArrowIosForward';
import avatarMock from '@/../public/avatar-mock.jpg';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Swiper as SwiperProps } from 'swiper';
import { Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// eslint-disable-next-line import/extensions
import 'swiper/scss';
// eslint-disable-next-line import/extensions
import 'swiper/scss/pagination';

import s from './PhotosSwiper.module.scss';

// Ниже экстенд от этого типа, что гарантирует, что передаваемый массив объектов будет принят без ошибок, если в нем есть свойство url
type HasUrl = { url: string | undefined };

type Props<T extends HasUrl> = {
  className?: string;
  classNameImage?: string;
  classNameSwiperSlide?: string; // ! ВОТ ЭТО НИХРЕНА НЕ РАБОТАЕТ!
  getIndex?: (val: number) => void;
  sliders: T[];
  styles?: string;
};

/**
 * Компонент `PhotosSwiper` — карусель изображений с поддержкой навигации и пагинации.
 * @template T - Тип, который расширяет интерфейс `HasUrl`. HasUrl - тип с параметром url: string. Короче, принимает массив любых объектов, но обязательно должен быть url
 * @param {string} className - Дополнительные классы для стилизации контейнера карусели.
 * @param {string} classNameImage - Дополнительные классы для стилизации изображений.
 * @param {string} classNameSwiperSlide - Дополнительные классы для стилизации слайдов карусели.
 * @param {function} getIndex - Функция, возвращает индекс текущего активного слайда.
 * @param {T[]} sliders - Массив объектов с изображениями, содержащими URL. Короче, принимает массив любых объектов, но обязательно должен быть url
 * @param {string} styles - Стиль фильтра, применяемый к изображению. ИНЛАЙНОВЫЙ
 */
export const PhotosSwiper = <T extends HasUrl>({
  className,
  classNameImage,
  classNameSwiperSlide,
  getIndex,
  sliders,
  styles
}: Props<T>) => {
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperProps | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwiperInit = (swiper: SwiperProps) => {
    swiperRef.current = swiper;
    updateActiveBullet(swiper);
  };

  const handleSlideChange = (swiper: SwiperProps) => {
    // Передаем index картинки с которой работаем, когда свайпнулись
    setCurrentIndex(swiper.realIndex);
    updateActiveBullet(swiper);
  };

  const updateActiveBullet = (swiper: SwiperProps) => {
    const bullets = document.querySelectorAll(`.${s.swiperPagination} .swiper-pagination-bullet`);

    bullets.forEach((bullet, index) => {
      if (index === swiper.realIndex) {
        bullet.classList.add(s.active);
      } else {
        bullet.classList.remove(s.active);
      }
    });
  };

  useEffect(() => {
    // Передаем index картинки наружу ЧЕРЕЗ USEEFFECT!
    if (swiperRef.current) {
      getIndex?.(swiperRef.current.realIndex);
    }
  });

  return (
    <div className={clsx(s.container, className)}>
      <Swiper
        navigation={{
          nextEl: `.${s.swiperButtonNext}`,
          prevEl: `.${s.swiperButtonPrev}`
        }}
        pagination={{
          clickable: true,
          el: `.${s.swiperPagination}`
        }}
        className={s.photosSwiper}
        modules={[Navigation, Pagination, Keyboard, Mousewheel]}
        onSlideChange={handleSlideChange}
        onSwiper={handleSwiperInit}
        keyboard
        mousewheel
      >
        {sliders.length > 1 ? (
          sliders.map((photo, i) => (
            <SwiperSlide className={clsx(s.swiperSlide, classNameSwiperSlide)} key={i}>
              <Image
                alt={`post photo ${i}`}
                className={classNameImage}
                height={100}
                src={photo.url || ''}
                style={styles ? { filter: styles } : {}}
                width={100}
                unoptimized
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className={clsx(s.swiperSlide, classNameSwiperSlide)}>
            <Image
              alt={'post photo'}
              className={clsx(classNameImage)}
              height={100}
              src={sliders[0]?.url || avatarMock}
              style={styles ? { filter: styles } : {}}
              width={100}
              unoptimized
            />
          </SwiperSlide>
        )}
      </Swiper>
      {sliders.length > 1 && (
        <>
          <button className={clsx(s.swiperButtonPrev, currentIndex === 0 && s.hidden)} ref={prevRef} type={'button'}>
            <ArrowIosBack />
          </button>
          <button
            className={clsx(s.swiperButtonNext, currentIndex === sliders.length - 1 && s.hidden)}
            ref={nextRef}
            type={'button'}
          >
            <ArrowIosForward />
          </button>
          <div className={s.swiperPagination}></div>
        </>
      )}
    </div>
  );
};
