/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect } from "react";
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';



const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});






const MyDocument2 = () => (

   
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>gfjdrtyghj</Text>
            </View>
            <View style={styles.section}>
                <Text>Sectioghjcghfjghjgjn #2</Text>
            </View>
        </Page>
    </Document>
);


export default MyDocument2;
