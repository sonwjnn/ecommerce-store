import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export const ConfirmModal = ({ children, onConfirm }) => {
  const handleConfirm = e => {
    e.stopPropagation()
    onConfirm()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={e => e.stopPropagation()} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể được hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={e => e.stopPropagation()}>
            Đóng
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
