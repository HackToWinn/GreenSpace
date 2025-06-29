import Link from "next/link";

const getSizeClasses = (size: string) => {
  switch (size) {
    case 'sm':
      return 'text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5';
    case 'lg':
      return 'text-md md:text-lg px-4 py-2 md:px-6 md:py-3';
    case 'md':
    default:
      return 'text-sm md:text-base px-3 py-1 md:px-4 md:py-2';
  }
};

const getColorClasses = (color: string) => {
  switch (color) {
    case 'primary':
      return 'bg-[#4CAF50] hover:bg-[#3E9E45] text-white';
    case 'secondary':
      return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
    case 'ghost':
    default:
      return 'bg-transparent text-gray-900';
  }
}

export default function CustomButton({ href, title, size = 'md', color = 'primary', className }: CustomButtonProps) {
  return (
    <Link href={href || ""}>
      <button className={`${getSizeClasses(size)} ${getColorClasses(color)} ${className} hover:cursor-pointer px-4 py-2 rounded-full text-base font-semibold transition-colors duration-200`}>
        {title}
      </button>
    </Link>
  )
}