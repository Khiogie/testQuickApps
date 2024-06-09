import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import useOutsideClick from '@/src/function/outside-click';
import styles from './index.module.css';
import { COLOR } from '@/styles/color';
import { FontSize } from '@/styles/font';

interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const Dropdown = ({
  id,
  title = 'Select',
  data,
  style,
  selectedId,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  return (
    <div ref={dropdownRef} className={styles.containerSelect}>
      <button
        id={id}
        aria-label='Toggle dropdown'
        aria-haspopup='true'
        aria-expanded={isOpen}
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(styles.button, style)}
      >
        <span style={{fontSize: FontSize.Regular}}>{selectedItem?.name || title}</span>
        <img 
          src={"icons/expandMore.svg"}
          className={classNames(
            styles.iconItem,
            {'flip' : isOpen}
          )}
        />
      </button>
      {/* Open */}
      {isOpen && (
        <div aria-label='Dropdown menu' className={styles.dropdownclass}>
          <ul
            role='menu'
            aria-labelledby={id}
            aria-orientation='vertical'
            className={classNames(styles.containerMenuList)}
          >
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames(
                  styles.menuItem,
                  { 'bg-gray': selectedItem?.id === item.id },
                )}
              >
                <span style={{color: "black", fontSize: FontSize.Regular}}>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;