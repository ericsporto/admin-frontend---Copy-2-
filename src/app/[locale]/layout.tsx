import type { Metadata } from 'next';
import ReactQueryWrapper from './ReactQueryWrapper';
import '../../styles/globals.css';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'NextionPay - Admin',
  description: 'NextionPay - Admin',
  icons: {
    icon: "/images/logo-x.svg",
  },
};



export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  const messages = useMessages();


  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryWrapper>{children}</ReactQueryWrapper>
          <ToastContainer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
