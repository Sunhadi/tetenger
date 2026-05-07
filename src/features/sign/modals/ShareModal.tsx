import React from 'react';
import { Share2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/Dialog';
import { Button } from '@/components/ui';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHARE_URL = 'https://tetenger-f9h1.vercel.app/';
const SHARE_TEXT =
  'Tetenger - Tanda tangan digital PDF yang aman & privat. Semua proses berjalan offline di browser, jadi dokumenmu tetap aman!';

const getFacebookShareUrl = () => {
  const params = new URLSearchParams({
    u: SHARE_URL,
  });
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
};

const getWhatsAppShareUrl = () => {
  const params = new URLSearchParams({
    text: `${SHARE_TEXT} ${SHARE_URL}`,
  });
  return `https://wa.me/?${params.toString()}`;
};

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const handleShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tetenger',
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
      } catch {
        // User cancelled or error
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md p-0 gap-0" showCloseButton>
        <DialogHeader className="p-4 border-b bg-zinc-50 dark:bg-zinc-900">
          <p className="text-sm font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-wide flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Bagikan Tetenger
          </p>
        </DialogHeader>
        <div className="p-4 text-sm space-y-4 bg-background">
          <h2 className="text-xl font-bold">Kamu suka Tetenger?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Sebarkan web ini ke sosial media kamu biar yang lain juga tahu dan bisa pakai! Bantu
            kami menyebarkan alat gratis ini ke lebih banyak orang.
          </p>

          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Native Share (mobile) */}
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <Button
                className="col-span-2 gap-2 bg-brand-500 hover:bg-brand-600 text-white"
                onClick={handleNativeShare}
              >
                <Share2 className="w-4 h-4" />
                Bagikan
              </Button>
            )}

            {/* Facebook */}
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => handleShare(getFacebookShareUrl())}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>

            {/* WhatsApp */}
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => handleShare(getWhatsAppShareUrl())}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground pt-2">
            Terima kasih sudah membantu menyebarkan Tetenger!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
