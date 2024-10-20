import { useAppDispatch, useAppSelector } from '@/shared/lib';

import { direction, modalSection } from '../lib/createPostConstants';
import getCroppedImg from '../lib/cropImage';
import { createPostActions, createPostSelectors } from '../service/createPostSlice';
import { NextBackDirection } from '../service/createPostSliceTypes';

// interface NavigateBtnLogic {
//   activeSection: CreatePostModalSections;
// }

/**
 * HookFunction that returns function to navigate between sections of the modal
 * Also here is logic to reset cropped area to originalImageUrl
 */

export const useNavigateBtnLogic = () => {
  const activeSection = useAppSelector(createPostSelectors.activeSection);
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const dispatch = useAppDispatch();

  // Из-за async функции getCroppedImg, нужно все оборачивать в async тоже, чтобы передавать в стейт не массив промисов, а значения
  // Функция для сохранения обрезанных изображений при переходе на стадию Filters
  const saveCropImgToUrl = async () => {
    const newImages = await Promise.all(
      allPostImages.map(async (img) => {
        // Эта функция нужна чтобы можно было картинку из Cropper компоненты, то есть с вырезаемой областью, СОХРАНИТЬ. То есть можно было бы обрезаемое изображение пересохранить.
        // Мы не будем менять оригинал, мы сохраним это в параметре url и buferUrl
        const croppedImg = await getCroppedImg(img.originUrl, img.croppedAreaPx);
        // А тут возвращаем в url (НЕ В OriginImageURL, то есть не в оригинал, а в обрабатываемый url).

        return {
          croppedAreaPx: img.croppedAreaPx,
          id: img.id,
          url: croppedImg ?? undefined
        };
      })
    );

    dispatch(createPostActions.updateUrlAndBuferWithCropped(newImages));
  };

  const navigateBtnLogic = (directionValue: NextBackDirection) => {
    switch (activeSection) {
      case modalSection.addPost:
        if (directionValue === direction.next) {
          dispatch(createPostActions.setActiveSection({ section: modalSection.cropping }));
        } else {
          console.log('Начало');
        }
        break;
      case modalSection.cropping:
        if (directionValue === direction.next) {
          dispatch(createPostActions.setActiveSection({ section: modalSection.filters }));
          // Сохраняем обрезанные изображения
          void saveCropImgToUrl();
        } else {
          dispatch(createPostActions.setAllPostImgs({ images: [] }));
          dispatch(createPostActions.setActiveSection({ section: modalSection.addPost }));
        }
        break;
      case modalSection.filters:
        if (directionValue === direction.next) {
          dispatch(createPostActions.setActiveSection({ section: modalSection.publication }));
        } else {
          dispatch(createPostActions.setActiveSection({ section: modalSection.cropping }));
        }
        break;
      case modalSection.publication:
        if (directionValue === direction.next) {
          console.log('отправить данные надобно');

          // pushToSend().then(() => {
          //   console.log({ final: allPostImages[0].buferUrl });
          // });
        } else {
          dispatch(createPostActions.setActiveSection({ section: modalSection.filters }));
        }
        break;
    }
  };

  return { navigateBtnLogic };
};
