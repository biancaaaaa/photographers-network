export const addNewReview = (message, jobId, jobName, authorData, receiverData) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    return firestore
      .collection("reviews")
      .add({
        message,
        jobId,
        jobName,
        authorData: authorData,
        receiverData: receiverData,
        createdAt: new Date().getTime()
      });
  };
};