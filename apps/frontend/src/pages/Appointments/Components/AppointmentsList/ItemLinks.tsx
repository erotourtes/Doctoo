type AppointmentLinksProps = { videoRecordKey: string; notes: string };

export default function AppointmentLinks({ videoRecordKey, notes }: AppointmentLinksProps) {
  return (
    <div>
      {videoRecordKey && <a href={videoRecordKey}>video recording</a>}
      {videoRecordKey && notes && ', '}
      {notes && <a href={notes}>notes</a>}
      {/* 
      {videoRecordKey && pdfKey && ', '}
      {pdfKey && <a href={pdfKey}>PDF files</a>}
      {(videoRecordKey || pdfKey) && notes && ', '}
      */}
    </div>
  );
}
