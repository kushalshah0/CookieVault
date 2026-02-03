"use client"

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'

interface Cookie {
  _id: string
  websiteName: string
  slug: string
}

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cookie: Cookie | null
  onSuccess: () => void
}

export function DeleteDialog({ open, onOpenChange, cookie, onSuccess }: DeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    if (!cookie) return

    setIsLoading(true)

    try {
      const response = await fetch(`/api/cookies/${cookie._id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Cookie deleted successfully')
        onSuccess()
      } else {
        const result = await response.json()
        toast.error(result.error || 'Failed to delete cookie')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Cookie</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{cookie?.websiteName}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" className="border-destructive-foreground border-t-transparent" />
                Deleting...
              </span>
            ) : (
              'Delete'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
