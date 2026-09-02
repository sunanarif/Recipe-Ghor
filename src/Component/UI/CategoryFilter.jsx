'use client';

import { useState, useEffect } from 'react';
import { Label, ListBox, Select } from '@heroui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CategoryFilter = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get('category') || ''
    );

    useEffect(() => {
        setSelectedCategory(searchParams.get('category') || '');
    }, [searchParams]);

    const handleCategoryChange = (keys) => {
        let selectedValue = '';

        if (keys && typeof keys === 'object' && keys.size > 0) {
            selectedValue = keys.values().next().value; 
        } else if (typeof keys === 'string') {
            selectedValue = keys;
        }

        // "all" সিলেক্ট করা হলে বা ফাঁকা থাকলে ক্যাটাগরি প্যারামিটার ক্লিয়ার হবে
        if (selectedValue === 'all') {
            selectedValue = '';
        }

        setSelectedCategory(selectedValue);

        const params = new URLSearchParams(searchParams.toString());
        
        if (selectedValue) {
            params.set('category', selectedValue);
        } else {
            params.delete('category'); // "all" এর জন্য URL থেকে category রিমুভ হবে
        }
        
        params.set('page', '1');

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <Select 
            className="w-[256px]" 
            placeholder="Select category"
            selectedKeys={selectedCategory ? new Set([selectedCategory]) : new Set(['all'])}
            onSelectionChange={handleCategoryChange}
        >
            <Label>Category</Label>
            <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
                <ListBox>
                    <ListBox.Item id="all" textValue="All">
                        All
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="breakfast" textValue="Breakfast">
                        Breakfast
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="lunch" textValue="Lunch">
                        Lunch
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="dinner" textValue="Dinner">
                        Dinner
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="snack" textValue="Snack">
                        Snack
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="dessert" textValue="Dessert">
                        Dessert
                        <ListBox.ItemIndicator />
                    </ListBox.Item>
                </ListBox>
            </Select.Popover>
        </Select>
    );
};

export default CategoryFilter;