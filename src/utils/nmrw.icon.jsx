import { FiCheckSquare, FiHome, FiXSquare } from 'react-icons/fi';
import { GrCompliance, GrProjects } from 'react-icons/gr';
import {
  MdAddBox,
  MdAttachFile,
  MdEditCalendar,
  MdElderlyWoman,
  MdEmail,
  MdFilterAlt,
  MdFilterAltOff,
  MdGridView,
  MdLibraryAdd,
  MdMonitorHeart,
  MdOutlineAddTask,
  MdOutlinePublishedWithChanges,
  MdOutlineSquare,
  MdPeople,
  MdPerson,
  MdRadioButtonUnchecked,
} from 'react-icons/md';
import { RiCalendarTodoFill, RiDeleteBin2Fill, RiFolderAddFill, RiUserLocationFill } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { CiMoneyBill } from 'react-icons/ci';
import { IoIosRadioButtonOn, IoMdAdd, IoMdAttach, IoMdCalendar, IoMdSend } from 'react-icons/io';
import { AiTwotoneFolderOpen } from 'react-icons/ai';
import {
  FaCircle,
  FaEdit,
  FaHandPointLeft,
  FaInternetExplorer,
  FaList,
  FaPhoneSquare,
  FaRegCheckSquare,
  FaThumbsDown,
  FaThumbsUp,
} from 'react-icons/fa';
import { BiCommentDetail, BiFemale } from 'react-icons/bi';
import { BsBarChart, BsSmartwatch, BsUiChecksGrid, BsYoutube } from 'react-icons/bs';
import clsx from 'clsx';
import { FaChartGantt, FaChildren, FaRegRectangleXmark, FaSpaceAwesome } from 'react-icons/fa6';
import { PiChatsLight, PiFlowArrowBold, PiPathDuotone, PiStepsBold, PiStepsDuotone } from 'react-icons/pi';
import { SlEnvolopeLetter, SlLocationPin } from 'react-icons/sl';
import { CgUserList } from 'react-icons/cg';
import { ImLocation } from 'react-icons/im';
import { RiFileGifFill } from 'react-icons/ri';
import { FaRegFileExcel, FaRegFilePdf, FaRegFilePowerpoint, FaRegFileWord } from 'react-icons/fa';
import { SiJpeg } from 'react-icons/si';
import { BiSolidFileJpg, BiSolidFilePng, BiSolidFileTxt } from 'react-icons/bi';
import { BsFiletypeMp3, BsFiletypeMp4, BsFiletypeTiff } from 'react-icons/bs';
import { TbMailForward } from 'react-icons/tb';
import { FcApproval } from 'react-icons/fc';
import { TiCancel } from 'react-icons/ti';
import { GiWeightLiftingUp } from 'react-icons/gi';

export const AppIcon = {
  //Sidebar Icons
  Home: <FiHome />,
  Projects: <GrProjects />,
  Compliancy: <GrCompliance />,
  Beneficiaries: <MdPeople />,
  Attachments: <MdAttachFile />,
  Tasks: <MdOutlineAddTask />,
  Budget: <CiMoneyBill />,
  Changes: <MdOutlinePublishedWithChanges />,
  SMTS: <RiUserLocationFill />,
  Settings: <IoSettingsOutline />,
  Training: <BsYoutube className='text-red-700' />,

  //Action Icons
  Approve: <FcApproval className='text-2xl' />,
  Add: <IoMdAdd className='text-lg' />,
  EditDate: <MdEditCalendar />,
  Pdf: <FaRegFilePdf />,
  Excel: <FaRegFileExcel />,
  Word: <FaRegFileWord />,
  Powerpoint: <FaRegFilePowerpoint />,
  Jpeg: <SiJpeg />,
  Png: <BiSolidFilePng />,
  Send: <TbMailForward className='font-semibold cursor-pointer sm:px-0 text-2xl' />,
  Submit: <IoMdSend />,
  Cancel: <TiCancel className='text-lg' />,
  StageApprove: <FaThumbsUp className='text-lg' />,
  StageReject: <FaThumbsDown className='text-lg' />,
  Revive: <FaSpaceAwesome className='text-lg' />,
  Identify: <FiCheckSquare className='text-lg' />,
  AddItem: (
    <MdLibraryAdd
      className={clsx('hover:text-orange-500 font-semibold cursor-pointer sm:px-0 text-2xl', 'text-viewcolor')}
    />
  ),
  OpenItems: (
    <RiFolderAddFill className={clsx('hover:text-green-500 font-semibold cursor-pointer sm:px-0', 'text-viewcolor')} />
  ),

  OpenAttachs: (
    <MdAddBox className={clsx('hover:text-green-500 font-semibold cursor-pointer sm:px-0', 'text-viewcolor')} />
  ),
  Open: (
    <AiTwotoneFolderOpen
      className={clsx('hover:text-green-500 font-semibold cursor-pointer sm:px-0 text-2xl', 'text-viewcolor')}
    />
  ),
  Edit: (
    <FaEdit className={clsx('text-editcolor', 'hover:text-orange-500 font-semibold cursor-pointer sm:px-0 text-2xl')} />
  ),
  Delete: (
    <RiDeleteBin2Fill
      className={clsx('text-deletecolor', 'hover:text-red-500 font-semibold cursor-pointer sm:px-0 text-2xl')}
    />
  ),
  ShowFilter: <MdFilterAlt className='text-lg' />,
  HideFilter: <MdFilterAltOff className='text-lg' />,
  //Asset icon
  Attachment: <IoMdAttach />,
  Comment: <BiCommentDetail />,
  Chat: <PiChatsLight className='text-lg' />,
  Workflow: <PiFlowArrowBold className='text-lg' />,

  Capacity: <GiWeightLiftingUp className='text-lg' />,
  Monitoring: <MdMonitorHeart className='text-lg' />,
  //Tab Icons
  Dashboard: <BsBarChart />,
  List: <FaList />,
  Board: <MdGridView />,
  Gantt: <FaChartGantt />,
  Todo: <RiCalendarTodoFill />,
  Mine: <CgUserList className='text-xl' />,
  Female: <BiFemale className='text-2xl' />,
  Pensioner: <MdElderlyWoman className='text-2xl' />,
  Youth: <FaChildren className='text-2xl' />,

  //contacts
  Email: <MdEmail />,
  Telephone: <FaPhoneSquare />,
  Physcal: <SlLocationPin />,
  Postal: <SlEnvolopeLetter />,
  Website: <FaInternetExplorer />,
  Required: <FiCheckSquare className='text-green-500' />,
  NotRequired: <MdOutlineSquare className='text-gray-500' />,

  Approved: <FiCheckSquare className='text-green-500 text-2xl' />,
  Rejected: <FaRegRectangleXmark className='text-red-500 text-2xl' />,
  Blank: <MdOutlineSquare className='text-gray-500 text-2xl' />,
  AllApproved: <FaThumbsUp className='text-green-500 text-2xl' />,
  NotApproved: <FaThumbsDown className='text-red-500 text-2xl' />,

  Current: <FaHandPointLeft className='text-green-500 text-2xl' />,
  Location: <ImLocation />,
  Person: <MdPerson />,
  Calendar: <IoMdCalendar />,
  Clock: <BsSmartwatch />,
  Plan: <BsUiChecksGrid />,
  Online: <FaCircle className='text-green-500 text-2xl' />,
  Tick: <FaRegCheckSquare className='text-green-500' />,
  Cross: <FiXSquare className='text-red-500' />,
  Disabled: <IoIosRadioButtonOn className='text-red-500 text-xl' />,
  NotDisabled: <MdRadioButtonUnchecked className='text-xl text-gray-500' />,
};

export function getFileSize(size) {
  let fileSize = size + 'bytes';
  if (size >= 1000) {
    fileSize = (size / 1000).toFixed(2) + ' kB';
  }
  if (size >= 1000000) {
    fileSize = (size / 1000000).toFixed(2) + ' MB';
  }
  if (size >= 1000000000) {
    fileSize = (size / 1000000000).toFixed(2) + ' GB';
  }
  if (size >= 1000000000000) {
    fileSize = (size / 1000000000000).toFixed(2) + ' TB';
  }
  return fileSize;
}

export function getFileIcon(url) {
  const parts = url?.split('.');
  const ext = '.' + parts[parts?.length - 1];
  let icon = <IoMdAttach className='text-lg md:text-2xl' />;
  if (ext === '.doc' || ext === '.docx') {
    icon = <FaRegFileWord className='text-lg md:text-2xl text-blue-500' />;
  }
  if (ext === '.xls' || ext === '.xlsx') {
    icon = <FaRegFileExcel className='text-lg md:text-2xl text-green-500' />;
  }
  if (ext === '.ppt' || ext === '.pptx') {
    icon = <FaRegFilePowerpoint className='text-lg md:text-2xl text-orange-800' />;
  }
  if (ext === '.pdf') {
    icon = <FaRegFilePdf className='text-lg md:text-2xl text-red-600' />;
  }
  if (ext === '.png') {
    icon = <BiSolidFilePng className='text-lg md:text-2xl text-red-950' />;
  }
  if (ext === '.jpeg') {
    icon = <SiJpeg className='text-lg md:text-2xl text-red-950' />;
  }
  if (ext === '.jpg') {
    icon = <BiSolidFileJpg className='text-lg md:text-2xl text-red-950' />;
  }
  if (ext === '.txt') {
    icon = <BiSolidFileTxt className='text-lg md:text-2xl text-blue-500' />;
  }
  if (ext === '.gif') {
    icon = <RiFileGifFill className='text-lg md:text-2xl text-red-950' />;
  }
  if (ext === '.mp3') {
    icon = <BsFiletypeMp3 className='text-lg md:text-2xl text-slate-500' />;
  }
  if (ext === '.mp4') {
    icon = <BsFiletypeMp4 className='text-lg md:text-2xl text-slate-500' />;
  }
  if (ext === '.tiff') {
    icon = <BsFiletypeTiff className='text-lg md:text-2xl text-red-950' />;
  }
  return icon;
}
