import { CgCheck, CgClose } from 'react-icons/cg';

interface ShowInformationCardProps {
  information?: string;
  label: string;
  checked?: boolean
}

const ShowInformationCard: React.FC<ShowInformationCardProps> = ({
  information,
  label,
  checked = true,
}) => {
  return (
    <div>
      <p className="text-white-50 text-base font-medium pb-1">{label}</p>
      <div className="flex justify-between items-center border border-green-50 h-10 rounded-[10px] px-5">
        <p className="text-gray-50 text-sm font-medium">{information}</p>
        {checked && <CgCheck size={24} className="text-green-50" />}
        {!checked && <CgClose size={24} className="text-red-100" />}
      </div>
    </div>
  );
};

export default ShowInformationCard;
