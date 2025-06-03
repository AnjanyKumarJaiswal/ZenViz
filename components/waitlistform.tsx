// components/OverlayForm.tsx
'use client';

import React, { useEffect, useRef , useState} from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import {joinwaitlist } from "@/app/lib/action";

interface WaitListFormProps {
  onClose: () => void;
}

export const WaitListForm: React.FC<WaitListFormProps> = ({ onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  async function  handleJoinWaitList(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault()
      
      const formData = new FormData(event.currentTarget)
      try{
        const res = await joinwaitlist(formData)
  
        if(res?.success === true){
          setStatus(res.message || "Successfully joined the waitlist!");
          return {"message": res?.message}
        } else {
        setStatus("Something went wrong. Try again.");
      }
      } catch(error){
        return {"message": error}
      }
    }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        ref={ref}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 w-full max-w-md",
          "border border-zinc-700 backdrop-blur-md"
        )}
      >
        <h2 className="text-lg font-semibold mb-4">Join the Waitlist</h2>

        {status && (
          <div className="mb-4 rounded bg-green-100 border border-green-400 text-green-800 px-4 py-2 text-sm">
            {status}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleJoinWaitList}>
          <input
            type="email"
            name='email'
            placeholder="Enter your email"
            className="p-2 rounded border border-zinc-300 focus:outline-none focus:ring"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};
