'use client'
import React from 'react';
import { Envelope, Gear } from "@gravity-ui/icons";
import { Button, FieldError, Input, Label, ListBox, Modal, Select, Surface, TextArea, TextField } from "@heroui/react";
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaEdit } from 'react-icons/fa';
import { editUserInfo } from '@/lib/api/userInfo';
const EditProfile = ({ user }) => {
    const { id } = user
    console.log(id);
    const onSubmit = async (e) => {
        e.preventDefault()
        const fromData = new FormData(e.currentTarget)
        const editedUser = Object.fromEntries(fromData.entries())
        console.log(editedUser);
        console.log(id);

        const editdata = await editUserInfo(id, editedUser)
        console.log(editdata);
        if (editdata.modifiedCount > 0) {
            toast.success('Update Profile')
            redirect('/dashboard/user/profile')
        }

    }

    return (
        <div>
            <Modal>
                <Button
                    size="sm"
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1 self-center sm:self-start shrink-0"
                >
                    <Gear className="w-3.5 h-3.5" />
                    Edit
                </Button>
                
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="w-full max-w-3xl">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                    <Envelope className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading>Contact Us</Modal.Heading>
                                <p className="mt-1.5 text-sm leading-5 text-muted">
                                    Fill out the form below and we will get back to you. The modal adapts automatically
                                    when the keyboard appears on mobile.
                                </p>
                            </Modal.Header>
                            <Modal.Body className="p-6 w-full">
                                <Surface variant="default">
                                    <form onSubmit={onSubmit}
                                        className="p-10 space-y-8"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                            <div className="md:col-span-2">
                                                <TextField name="name" isRequired defaultValue={user?.name}>
                                                    <Label>Name</Label>
                                                    <Input placeholder="Idea Title" className="rounded-2xl" />
                                                    <FieldError />
                                                </TextField>
                                            </div>


                                            {/* Image URL - Removed preview */}
                                            <div className="md:col-span-2">
                                                <TextField name="image" isRequired defaultValue={user?.image}>
                                                    <Label>Image URL</Label>
                                                    <Input
                                                        type="url"
                                                        placeholder="https://example.com/bali-paradise.jpg"
                                                        className="rounded-2xl"
                                                    />
                                                    <FieldError />
                                                </TextField>
                                            </div>


                                        </div>

                                        {/* Buttons */}


                                        <Modal.Footer>
                                            <Button slot="close" variant="secondary">
                                                Cancel
                                            </Button>
                                            <Button type='submit' slot="close" className={'bg-orange-500 text-white'}>Save Change</Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default EditProfile;