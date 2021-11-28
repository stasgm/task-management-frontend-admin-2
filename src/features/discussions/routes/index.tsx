import { Navigate, Route, Routes } from 'react-router-dom';

import { Discussion } from '../components/Discussion';
import { Discussions } from '../components/Discussions';

export const DiscussionsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Discussions />} />
      <Route path=":discussionId" element={<Discussion />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
