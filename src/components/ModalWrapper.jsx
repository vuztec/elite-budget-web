import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import useUserStore from '../app/user';
import Loading from './Loader';
import Button from './Button';
import { TiCancel } from 'react-icons/ti';
import { IoMdSend } from 'react-icons/io';

export const ModalWrapper1 = ({ open, handleClose, size, children, isLoading, onSubmit, handleCloseButton }) => {
  const { user } = useUserStore();
  const cancelButtonRef = useRef(null);
  let otherClass = 'sm:w-[69%] max-w-[99%] lg:max-w-[50%] xl:max-w-[35%] 2xl:max-w-[25%]';
  if (size === 'xs') {
    otherClass = 'sm:w-[69%] max-w-[99%] lg:max-w-[50%] xl:max-w-[35%] 2xl:max-w-[25%]';
  } else if (size === 'sm') {
    otherClass = 'sm:w-[69%] max-w-[99%] lg:max-w-[50%] xl:max-w-[40%] 2xl:max-w-[30%]';
  } else if (size === 'lg') {
    otherClass = 'sm:w-[99%] max-w-[99%] lg:max-w-[99%] xl:max-w-[80%] 2xl:max-w-[60%]';
  } else if (size === 'xl') {
    otherClass = 'sm:w-[99%] max-w-[99%]';
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 w-full" initialFocus={cancelButtonRef} onClose={handleClose}>
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <form className="flex h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'w-full h-fit sm:h-fit overflow-y-auto relative transform overflow-auto rounded-xl bg-white text-left shadow-xl transition-all pb-0 sm:my-8',
                  otherClass,
                )}
              >
                <div className="bg-white px-2 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full mt-3 sm:ml-4 sm:mt-0 sm:text-left">{children}</div>
                  </div>
                </div>

                {/* Footer Content */}
                <div className="bg-gray-100 px-4 py-0 sm:px-6">
                  {isLoading ? (
                    <div className="py-5">
                      <Loading />
                    </div>
                  ) : (
                    <div className="gap-3 p-3 mt-4 flex flex-row-reverse">
                      <Button
                        type="submit"
                        className="w-fit flex flex-row-reverse items-center gap-1 text-white"
                        label="Enter"
                        icon={<IoMdSend />}
                        onClick={onSubmit}
                      />
                      <Button
                        type="button"
                        className="bg-pink-200 flex flex-row-reverse items-center gap-1 text-gray-900"
                        onClick={handleCloseButton}
                        label="Cancel"
                        icon={<TiCancel />}
                      />
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </form>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const ModalWrapper = ({ open, handleClose, children }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 w-full" initialFocus={cancelButtonRef} onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full h-fit max-h-[90%] sm:h-fit overflow-y-auto relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all pb-0 sm:my-8 sm:w-[69%] max-w-[99%] lg:max-w-[50%] xl:max-w-[35%] 2xl:max-w-[25%]">
                <div className="bg-white px-2 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full mt-3  sm:ml-4 sm:mt-0 sm:text-left">{children}</div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalWrapper;
