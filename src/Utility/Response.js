const Response = ({
    response,
    statuscode = 200,
    datas = [],
    message = "",
}) => {
    response.status(statuscode).json({
        statuscode: statuscode,
        message: message,
        datas: datas
    });
};

export default Response;
