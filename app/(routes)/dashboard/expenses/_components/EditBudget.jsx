"use client";
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { DialogClose } from '@radix-ui/react-dialog';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';


function EditBudget({ budgetInfo, refreshData }) {

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    const { user } = useUser();

    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo?.icon);
            setName(budgetInfo?.name);
            setAmount(budgetInfo?.amount);
        }
    }, [budgetInfo])

    /**
     * UPDATE A BUDGET INFORMATION
     */
    const onUpdateBudget = async () => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon
        }).where(eq(Budgets.id, budgetInfo.id))
            .returning();
        if (result) {
            refreshData();
            toast("Budget Updated Successfully!");
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>

                    <Button className="flex gap-2 cursor-pointer"> <PenBox />Edit</Button>

                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update New Budget</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to create a new budget.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Move block elements outside DialogDescription */}
                    <div className='mt-5'>
                        <Button
                            variant='outline'
                            className="text-lg"
                            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                        >
                            {emojiIcon}
                        </Button>

                        {openEmojiPicker && (
                            <div className='absolute z-20'>
                                <EmojiPicker
                                    open={openEmojiPicker}
                                    onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji);
                                        setOpenEmojiPicker(false);
                                    }}
                                />
                            </div>
                        )}

                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Budget Name</h2>
                            <Input
                                placeholder='e.g. Home Decor'
                                defaultValue={budgetInfo?.name}
                                /**
                                 * budgetInfo?.name MEANS=>
                                 * (budgetInfo !== undefined && budgetInfo !== null) ? budgetInfo.name : undefined
                                 * In simple words:
                                 *If budgetInfo exists (not undefined or null), then return budgetInfo.name.
                                 *If budgetInfo is undefined or null, then safely return undefined (without throwing an error).
                                 */
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className='mt-2'>
                            <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                            <Input
                                type="number"
                                placeholder='e.g. 5000$'
                                defaultValue={budgetInfo?.amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                onClick={() => onUpdateBudget()}
                                className='mt-5 w-full cursor-pointer'
                            >
                                Update Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget