import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "../../utils/axios";
import { Field, Form, Formik } from "formik";
import { setUser } from "../../Redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const EditProfile = ({ open, setOpen }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  //   const [successMessage, setSuccessMessage] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");
  //   const notify = () => toast.success("Details updated");

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Mobile number is required"),
    bio: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setIsSubmitting(true);
      const userId = user._id;
      const { phone, name } = values;
      const data = { name, phone, userId };

      const response = await axios.put(`/api/user/profile/${user._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //   setSuccessMessage("Profile updated successfully");
      setIsSubmitting(false);
      setOpen(false);

      dispatch(setUser({ user: response.data.updatedUser }));
    } catch (error) {
      //   setErrorMessage("Failed to update profile");
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  const [profileEdit, setProfileEdit] = useState(true);
  return (
    <>
      <ToastContainer />
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            height: "80vh",
            width: { sm: "100vw", md: "50vw" },
          }}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Stack direction="row" spacing={2}>
            <Box>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={(e) => setProfileEdit(true)}>
                    <ListItemText primary="Edit Profile" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton onClick={(e) => setProfileEdit(false)}>
                    <ListItemText primary="Change Password" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            {profileEdit && (
              <Box
                flex={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  justifyContent: "center",
                }}
              >
                <Formik
                  initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    name: user.name,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field
                        name="username"
                        as={TextField}
                        label="User Name"
                        variant="standard"
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                        disabled
                        style={{
                          margin: "5px",
                        }}
                      />
                      <Field
                        name="email"
                        as={TextField}
                        label="Email"
                        variant="standard"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        disabled
                        style={{
                          margin: "5px",
                        }}
                      />

                      <Field
                        name="name"
                        as={TextField}
                        label="Name"
                        variant="standard"
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        style={{
                          margin: "5px",
                          width: "100%",
                        }}
                      />

                      <Field
                        name="phone"
                        as={TextField}
                        variant="standard"
                        label="Phone Number"
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
                        style={{
                          margin: "5px",
                          width: "100%",
                        }}
                      />
                      <Button
                        sx={{
                          alignItems: "center",
                          width: "30%",
                          backgroundColor: "black",
                          color: "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                          marginTop: "5px",
                          marginLeft: "5px",
                          "&:hover": {
                            backgroundColor: "green",
                          },
                        }}
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                      >
                        Save
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            )}
            {!profileEdit && (
              <Box
                flex={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  justifyContent: "center",
                }}
              >
                <TextField
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="New password"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  label="Confirm new password"
                  variant="standard"
                />
                <Button
                  sx={{
                    width: "50%",
                    backgroundColor: "#938eef",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rebeccapurple",
                    },
                  }}
                  variant="contained"
                >
                  submit
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
      </StyledModal>
    </>
  );
};

export default EditProfile;
