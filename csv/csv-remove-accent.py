import unidecode
import csv

def remove_accent (feed):
    csv_f = open(feed, encoding='latin-1', mode='r')
    csv_str = csv_f.read()
    csv_str_removed_accent = unidecode.unidecode(csv_str)
    csv_f.close()
    csv_f = open(feed, 'w')
    csv_f.write(csv_str_removed_accent)
    return True

if __name__ == "__main__":
    remove_accent('eimm_municipio_tr_cifra_2006.csv')
    remove_accent('eimm_municipio_tr_cifra_2007.csv')
    remove_accent('eimm_municipio_tr_cifra_2008.csv')
    remove_accent('eimm_municipio_tr_cifra_2009.csv')
    remove_accent('eimm_municipio_tr_cifra_2010.csv')
    remove_accent('eimm_municipio_tr_cifra_2011.csv')
    remove_accent('eimm_municipio_tr_cifra_2012.csv')
    remove_accent('eimm_municipio_tr_cifra_2013.csv')
    remove_accent('eimm_municipio_tr_cifra_2014.csv')
    remove_accent('eimm_municipio_tr_cifra_2015.csv')
    remove_accent('eimm_municipio_tr_cifra_2016.csv')
    remove_accent('eimm_municipio_tr_cifra_2017.csv')
    remove_accent('eimm_municipio_tr_cifra_2018.csv')
