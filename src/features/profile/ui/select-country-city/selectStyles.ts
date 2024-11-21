// import { CSSObjectWithLabel, ControlProps, GroupBase, OptionProps } from 'react-select'
//
// import { SelectData } from '@/features/profile/model/useSelectCountryCity'
//
// export const selectStyle = {
//   control: (
//     provided: CSSObjectWithLabel,
//     state: ControlProps<SelectData, false, GroupBase<SelectData>>
//   ) => ({
//     ...provided,
//     ':hover': {
//       borderColor: '#8d9094',
//       color: '#8d9094',
//       cursor: 'pointer',
//     },
//     backgroundColor: 'black',
//     borderColor: state.isFocused ? 'white' : '#4c4c4c',
//     boxShadow: state.isFocused ? '0 0 0 1px white' : provided.boxShadow,
//     color: 'white',
//     opacity: state.isDisabled ? 0.5 : 1,
//     width: '100%',
//   }),
//   dropdownIndicator: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     ':hover': {
//       color: 'white',
//     },
//     color: 'white',
//   }),
//   indicatorSeparator: () => ({
//     display: 'none',
//   }),
//   menu: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     borderColor: 'white',
//     borderWidth: '2px',
//     boxShadow: 'none',
//   }),
//   menuList: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     padding: 0,
//   }),
//   option: (
//     provided: CSSObjectWithLabel,
//     state: OptionProps<SelectData, false, GroupBase<SelectData>>
//   ) => ({
//     ...provided,
//     ':hover': {
//       backgroundColor: '#333',
//       color: '#397df6',
//     },
//     backgroundColor: 'black',
//     color: state.isSelected ? '#397df6' : '',
//   }),
//   placeholder: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     color: 'white',
//   }),
//   singleValue: (provided: CSSObjectWithLabel) => ({
//     ...provided,
//     color: 'white',
//   }),
// }
